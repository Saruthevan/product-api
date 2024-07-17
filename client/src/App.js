import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Grid } from '@mui/material';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api/api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ _id: '', name: '', type: '', price: 0, rating: 0, warranty_years: 0, available: true });
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateProduct(product._id, product);
    } else {
      await createProduct(product);
    }
    fetchProducts();
    handleClose();
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProduct({ _id: '', name: '', type: '', price: 0, rating: 0, warranty_years: 0, available: true });
    setIsEditing(false);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Product Management</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 16 }}>
        <Grid container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Product
          </Button>
        </Grid>
        <ProductList products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
        <ProductForm
          open={open}
          handleClose={handleClose}
          product={product}
          setProduct={setProduct}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </Container>
    </div>
  );
}

export default App;
