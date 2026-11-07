import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { db } = vi.hoisted(() => {
	const db = {
		select: vi.fn(), from: vi.fn(), where: vi.fn(), limit: vi.fn(),
		insert: vi.fn(), values: vi.fn(),
	}
	return { db }
})
vi.mock('drizzle-orm/libsql', () => ({ drizzle: () => db }))
vi.mock('@libsql/client', () => ({ createClient: () => ({}) }))

import { GrowthEngineHandler } from '@growth-engine/sdk-server'

const fields = [
	{ name: 'name', label: 'Name', type: 'text', required: true, order: 0 },
	{ name: 'email', label: 'Email', type: 'email', required: true, order: 1 },
	{ name: 'message', label: 'Message', type: 'textarea', required: true, order: 2 },
]
const data = { name: 'Jane Doe', email: 'jane@example.com', message: 'Can we discuss a collaboration?' }

async function submit(body: Record<string, unknown>) {
	const { POST } = GrowthEngineHandler({
		brainApiUrl: 'https://brain.example.com', brainApiKey: 'test-key',
		tursoUrl: 'libsql://test', tursoAuthToken: 'test-token',
	})
	return POST(new Request('https://example.com/api/rs/forms?action=submit&slug=contact-form', {
		method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
	}))
}

describe('installed SDK form spam protections', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		for (const method of ['select', 'from', 'where', 'insert'] as const) db[method].mockReturnValue(db)
		db.limit.mockResolvedValue([{
			id: 'contact-form-id', slug: 'contact-form', name: 'Contact Us', status: 'active',
			fields: JSON.stringify(fields), settings: JSON.stringify({ notifyEmails: ['owner@example.com'] }),
		}])
		db.values.mockResolvedValue(undefined)
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ sent: 1, total: 1 })))
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
	})
	afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals() })

	it.each([
		['honeypot', { data, company_website: 'https://spam.example.com' }],
		['too_fast', { data, renderedAt: 10000, submittedAt: 10500 }],
		['gibberish', { data: { ...data, name: 'DvgVeaEBqPUObnNbl', message: 'qUjENUMKngyfjemC' } }],
	])('blocks %s before storing contacts or sending notifications', async (reason, body) => {
		const response = await submit(body)
		expect(response.status).toBe(200)
		expect(response.headers.get('X-Form-Accepted')).toBe('0')
		expect(await response.json()).toMatchObject({ ok: true })
		expect(fetch).not.toHaveBeenCalled()
		// A blocked submission writes only its recovery audit entry.
		expect(db.values).toHaveBeenCalledTimes(1)
		expect(db.values).toHaveBeenCalledWith(expect.objectContaining({
			action: 'form.spam_blocked', metadata: expect.stringContaining(reason),
		}))
	})

	it('allows a legitimate message', async () => {
		const response = await submit({ data, company_website: '', renderedAt: 10000, submittedAt: 18000 })
		expect(response.status).toBe(200)
		expect(response.headers.get('X-Form-Accepted')).toBeNull()
		expect(db.values).toHaveBeenCalledWith(expect.objectContaining({ formId: 'contact-form-id', data: JSON.stringify(data) }))
		expect(fetch).toHaveBeenCalledWith('https://brain.example.com/api/sdk/forms/notify', expect.anything())
	})
})
