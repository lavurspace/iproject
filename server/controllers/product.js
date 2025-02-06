const { GoogleGenerativeAI } = require('@google/generative-ai')
const products = require('../data/products.json')

class ProductController {
    static async getAllProducts(req, res, next) {
        try {
            const { search } = req.query
            let filteredProducts = [...products]

            if (search) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(search.toLowerCase())
                )
            }

            res.status(200).json({
                products: filteredProducts
            })

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params
            const product = products.find(p => p.id === Number(id))

            if (!product) throw { name: 'NotFound' }

            res.status(200).json({
                product
            })
        } catch (err) {
            next(err)
        }
    }

    static async gemini(req, res, next) {
        try {
            const genAi = new GoogleGenerativeAI('AIzaSyCj5aPLGolQtxeGM48qCapP5kEKqwRHUOM');
            const model = genAi.getGenerativeModel({ model: "gemini-pro" });

            const prompt = `Act as a music equipment expert. Given this list of products: ${JSON.stringify(products)}, provide 10 recommended products. Requirements:
1. Response must be ONLY a valid JSON array containing exactly 10 products
2. Each product must have these properties: name, description, price, stock, rating, image
3. Do not add any text before or after the JSON
4. Format as a single line without line breaks
5. Products should be randomly selected from the input list
6. Do not modify any original product data
7. Ensure the output is valid JSON that can be parsed with JSON.parse()
Example format: [{"name":"Product 1","description":"desc","price":1000,"stock":5,"rating":4.5,"image":"url"},...]`;

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            
            // Clean the response text
            const cleanText = text.trim()
                .replace(/```json/g, '')  // Remove markdown code blocks if present
                .replace(/```/g, '')      // Remove closing code blocks
                .replace(/\n/g, '')       // Remove line breaks
                .trim();                  // Trim any remaining whitespace

            // Validate JSON structure
            if (!cleanText.startsWith('[') || !cleanText.endsWith(']')) {
                throw new Error('Invalid JSON array format');
            }

            const parsedProducts = JSON.parse(cleanText);

            // Validate array length
            if (!Array.isArray(parsedProducts) || parsedProducts.length !== 10) {
                throw new Error('Response must contain exactly 10 products');
            }

            // Validate each product has required properties
            parsedProducts.forEach(product => {
                const requiredProps = ['name', 'description', 'price', 'stock', 'rating', 'image'];
                requiredProps.forEach(prop => {
                    if (!(prop in product)) {
                        throw new Error(`Missing required property: ${prop}`);
                    }
                });
            });

            res.status(200).json({
                message: "Our Recommendations",
                recommendations: parsedProducts
            });
        } catch (err) {
            console.log('Gemini API Error:', err);
            next({
                name: 'GeminiError',
                message: 'Failed to generate recommendations. Please try again.'
            });
        }
    }
}

module.exports = ProductController