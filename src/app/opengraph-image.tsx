import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'AI Juicing — build, experiment, share'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The generated OG image deliberately composes the real mascot and logo
 * instead of approximating either with generated artwork.
 */
export default async function OpenGraphImage() {
	const [mascot, logo] = await Promise.all([
		readFile(join(process.cwd(), 'src/app/og-assets/mascot.png'), 'base64'),
		readFile(join(process.cwd(), 'src/app/og-assets/logo.png'), 'base64'),
	])

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
					position: 'relative',
					overflow: 'hidden',
					backgroundColor: '#101014',
					backgroundImage:
						'radial-gradient(circle at 14% 16%, rgba(221, 255, 33, 0.22), transparent 27%), radial-gradient(circle at 78% 84%, rgba(255, 0, 213, 0.2), transparent 32%)',
				}}
			>
				<div
					style={{
						display: 'flex',
						position: 'absolute',
						left: 70,
						top: 66,
						width: 625,
						height: 500,
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<img
						src={`data:image/png;base64,${logo}`}
						width={560}
						height={130}
						style={{ display: 'flex', objectFit: 'contain', objectPosition: 'left center' }}
					/>
					<div
						style={{
							display: 'flex',
							marginTop: 35,
							fontSize: 46,
							fontWeight: 700,
							letterSpacing: '-2px',
							color: '#ffffff',
						}}
					>
						Build. Experiment. Share.
					</div>
					<div
						style={{
							display: 'flex',
							marginTop: 18,
							fontSize: 25,
							lineHeight: 1.35,
							color: '#d3d3d9',
						}}
					>
						A home for AI experiments, projects, and the things worth sharing.
					</div>
				</div>
				<img
					src={`data:image/png;base64,${mascot}`}
					width={560}
					height={560}
					style={{
						display: 'flex',
						position: 'absolute',
						right: 24,
						bottom: -18,
						objectFit: 'contain',
					}}
				/>
			</div>
		),
		{ ...size },
	)
}
