const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = 3001;

// Endpoint para obtener un producto por SKU
app.get('/sku/:sku', async (req, res) => {
  try {
    const sku = req.params.sku;
    const products = await loadProducts();
    const product = products.find((p) => p.sku === sku);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener todos los productos
app.get('/sku/allProducts', async (req, res) => {
  try {
    const products = await loadProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Función para cargar los productos desde el archivo JSON
async function loadProducts() {
  const data = await fs.readFile('mockData.json', 'utf-8');
  return JSON.parse(data);
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});
