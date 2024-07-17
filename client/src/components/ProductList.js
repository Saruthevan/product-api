import React from 'react';
import { List, Typography, Paper } from '@mui/material';
import ProductItem from './ProductItem';

const ProductList = ({ products, handleEdit, handleDelete }) => {
  return (
    <Paper style={{ padding: 16, marginTop: 16 }}>
      <Typography variant="h6">Product List</Typography>
      <List>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))}
      </List>
    </Paper>
  );
};

export default ProductList;
