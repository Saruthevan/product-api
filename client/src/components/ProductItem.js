import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

const ProductItem = ({ product, handleEdit, handleDelete }) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={`${product._id}: ${product.name} - $${product.price}`}
        secondary={`Type: ${product.type}, Rating: ${product.rating}, Warranty: ${product.warranty_years} years, Available: ${product.available ? 'Yes' : 'No'}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(product)}>
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(product._id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProductItem;
