import React, { useState } from 'react';
import styled from 'styled-components';
import BookForm from './formUtils/BookForm';
import DvdForm from './formUtils/DvdForm';
import FunitureForm from './formUtils/FunitureForm';
import selectedFormItem, {
  getFormValue,
  isValid,
  productType,
} from './formUtils/Ultils';
import { useNavigate } from 'react-router-dom';
import Notification from '../feature/Notification';

function Form() {
  const navigate = useNavigate();
  const [product, setProductType] = useState({
    DVD: false,
    Furniture: false,
    Book: false,
  });

  const [notice, setNotice] = useState({
    show: false,
    message: '',
  });

  const formSelect = (e) => {
    const itemSelected = e.target.value;
    const newState = productType(itemSelected, product);
    setProductType(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedValue = selectedFormItem(product);
    const formData = getFormValue(selectedValue, e);
    const isValidReponse = isValid(formData);

    if (isValidReponse[0] === true) {
      handleNotice(isValidReponse);
    } else {
      // Valid Form ready to send
      console.log(formData);
    }
  };

  const handleNotice = (checkResult) => {
    setNotice(() => ({
      show: checkResult[0],
      message: checkResult[1],
    }));

    setTimeout(() => {
      setNotice(() => ({
        ...notice,
        show: false,
      }));
    }, 5000);
  };

  return (
    <>
      <Notification message={notice['message']} show={notice['show']} />
      <Container>
        <form
          className="product-form flex column"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-item flex j-between">
            <label>SkU</label>
            <input type="text" name="sku" id="sku" />
          </div>

          <div className="form-item flex j-between">
            <label>Name</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="form-item flex j-between">
            <label>Price ($)</label>
            <input type="text" name="price" id="price" />
          </div>

          <div className=" switcher form-item flex j-between">
            <label>Type Switcher</label>
            <select onChange={(e) => formSelect(e)} id="productType">
              <option selected>Type Switcher</option>
              <option value="DVD">DVD</option>
              <option value="Furniture">Furniture</option>
              <option value="Book">Book</option>
            </select>
          </div>
          <section className="dynamic-form flex column">
            <div
              className="book-form"
              style={{ display: product['Book'] ? 'block' : 'none' }}
            >
              <BookForm />
            </div>
            <div
              className="dvd-form"
              style={{ display: product['DVD'] ? 'block' : 'none' }}
            >
              <DvdForm />
            </div>
            <div
              className="furniture-form"
              style={{ display: product['Furniture'] ? 'block' : 'none' }}
            >
              <FunitureForm />
            </div>
          </section>

          <div className="form-buttons flex">
            <button
              type="button"
              className="button cancel"
              onClick={() => navigate('/')}
              hidden
            >
              Cancel
            </button>

            <button type="submit" className="button submit" hidden>
              Save
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default Form;
const Container = styled.div`
  .product-form {
    gap: 15px;

    .switcher {
      margin: 20px 0;
      padding-right: 15px;
    }

    .form-item {
      gap: 20px;
      align-items: flex-end;

      label {
        font-size: 1rem;
      }
    }

    .dynamic-form {
      gap: 15px;
    }

    input:focus {
      outline: none;
      padding-left: 2px;
    }
  }
`;
