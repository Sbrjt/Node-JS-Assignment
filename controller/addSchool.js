import schoolSchema from '../schema/school.js'
import sql from '../utils/sql.js'

async function addSchool(req, res) {
	const zod = schoolSchema.safeParse(req.body)

	if (!zod.success)
		return res.status(400).json({ error: zod.error.format() })

	const { name, address, latitude, longitude } = zod.data

	try {
		const [result] = await sql.execute(
			'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
			[name, address, latitude, longitude]
		)

		res.json({
			message: 'School added successfully',
			schoolId: result.insertId,
		})
	} 
    catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
}

export default addSchool
