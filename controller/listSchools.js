import latLngSchema from '../schema/latLng.js'
import sql from '../utils/sql.js'

async function listSchools(req, res) {
	const zod = latLngSchema.safeParse(req.query)

	if (!zod.success) 
		return res.status(400).json({ error: zod.error.format() })

	const { latitude, longitude } = zod.data

	try {
		// ST_Distance_Sphere finds the spherical distance between 2 points on Earth
		const [schools] = await sql.execute(
            `SELECT 
                *,
                ROUND(
                    ST_Distance_Sphere(
                        POINT(longitude, latitude),
                        POINT(?, ?)
                    ) / 1000,
                    1
                ) AS distanceKm
            FROM schools
            ORDER BY distanceKm`,
            [longitude, latitude]
        )
        
		res.json(schools)
	} 
    catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
}

export default listSchools
