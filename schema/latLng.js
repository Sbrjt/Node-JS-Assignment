import { z } from 'zod'

// req.query sends everything as strings 
// so first check if it's a non-empty string
// then enforce the numeric range 

const latLngSchema = z.object({
	latitude: z.string().nonempty().pipe(
        z.coerce.number().min(-90).max(90)
    ),
	longitude:  z.string().nonempty().pipe(
        z.coerce.number().min(-180).max(180)
    ),
})

export default latLngSchema
