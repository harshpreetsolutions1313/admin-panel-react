import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { useFetchData } from '@/hooks/useFetchData';
import { Card, CardFooter, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ProductCard = ({
  title,
  price,
  category,
  image,
  rating,
  size,
  stockLeft,
  stockSold,
  name,
  stock,
  reviews,
  images,
  description,
  _id,
  id
}) => {
  // Handle different API response structures
  const productName = title || name || 'N/A';
  const productPrice = price || 0;
  // Handle images array from API
  const productImage = image || (Array.isArray(images) && images[0]) || '';
  const productCategory = category || 'N/A';
  const productSize = size || 'm';
  const productRating = rating?.star || rating || 0;
  const productReviews = rating?.review || reviews || 0;
  const productStockLeft = stockLeft || (typeof stock === 'number' ? stock : stock?.left) || 0;
  const productStockSold = stockSold || stock?.sold || 0;
  const productId = _id || id || '';

  return <tr>
      <td>
        <div className="form-check ms-1">
          <input type="checkbox" className="form-check-input" id="customCheck2" />
          <label className="form-check-label" htmlFor="customCheck2">
            &nbsp;
          </label>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
            {productImage && <img src={productImage} alt="product" className="avatar-md" style={{ objectFit: 'cover' }} />}
          </div>
          <div>
            <Link to="" className="text-dark fw-medium fs-15">
              {productName}
            </Link>
            <p className="text-muted mb-0 mt-1 fs-13">
              <span>Size : </span>
              {productSize}
            </p>
          </div>
        </div>
      </td>
      <td>
        {currency}
        {productPrice}.00
      </td>
      <td>
        <p className="mb-1 text-muted">
          <span className="text-dark fw-medium">{productStockLeft} Item</span> Left
        </p>
        <p className="mb-0 text-muted">{productStockSold} Sold</p>
      </td>
      <td>{productCategory}</td>
      <td>
        {' '}
        <span className="badge p-1 bg-light text-dark fs-12 me-1">
          <IconifyIcon icon="bxs:star" className="align-text-top fs-14 text-warning me-1" />
          {productRating}
        </span>{' '}
        {productReviews} Review
      </td>
      <td>
        <div className="d-flex gap-2">
          <Link to="" className="btn btn-light btn-sm">
            <IconifyIcon icon="solar:eye-broken" className="align-middle fs-18" />
          </Link>
          <Link to="" className="btn btn-soft-primary btn-sm">
            <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
          </Link>
          <Link to="" className="btn btn-soft-danger btn-sm">
            <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
          </Link>
        </div>
      </td>
    </tr>;
};
const ProductList = () => {
  const fetchProductsFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  
  const productData = useFetchData(fetchProductsFromAPI);
  return <Card>
      <CardHeader className="d-flex justify-content-between align-items-center gap-1">
        <CardTitle as={'h4'} className="flex-grow-1">
          All Product List
        </CardTitle>
        <Link to="/products/product-add" className="btn btn-sm btn-primary">
          Add Product
        </Link>
        <Dropdown>
          <DropdownToggle as={'a'} href="#" className="btn btn-sm btn-outline-light content-none" data-bs-toggle="dropdown" aria-expanded="false">
            This Month
            <IconifyIcon width={16} height={16} className="ms-1" icon="bx:chevron-down" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem>Download</DropdownItem>
            <DropdownItem>Export</DropdownItem>
            <DropdownItem>Import</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover table-centered">
            <thead className="bg-light-subtle">
              <tr>
                <th style={{
                width: 20
              }}>
                  <div className="form-check ms-1">
                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                    <label className="form-check-label" htmlFor="customCheck1" />
                  </div>
                </th>
                <th>Product Name &amp; Size</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{productData?.map((item, idx) => <ProductCard key={idx} {...item} />)}</tbody>
          </table>
        </div>
      </div>
      <CardFooter className="border-top">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end mb-0">
            <li className="page-item">
              <Link className="page-link" to="">
                Previous
              </Link>
            </li>
            <li className="page-item active">
              <Link className="page-link" to="">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                3
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </CardFooter>
    </Card>;
};
export default ProductList;