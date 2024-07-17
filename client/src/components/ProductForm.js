import React from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel
} from '@mui/material';

const ProductForm = ({ open, handleClose, product, setProduct, handleSubmit, isEditing }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            fullWidth
            value={product.type}
            onChange={(e) => setProduct({ ...product, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Rating"
            type="number"
            fullWidth
            value={product.rating}
            onChange={(e) => setProduct({ ...product, rating: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Warranty Years"
            type="number"
            fullWidth
            value={product.warranty_years}
            onChange={(e) => setProduct({ ...product, warranty_years: parseInt(e.target.value) })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={product.available}
                onChange={(e) => setProduct({ ...product, available: e.target.checked })}
              />
            }
            label="Available"
          />
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
