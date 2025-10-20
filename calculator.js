document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const quantityError = document.getElementById('quantityError');
    
    const numberRegex = /^[1-9][0-9]*$/;
    
    function hideAllMessages() {
        resultDiv.style.display = 'none';
        errorMessage.style.display = 'none';
        quantityError.style.display = 'none';
        quantityInput.classList.remove('is-invalid');
    }
    
    function validateQuantity(value) {
        return numberRegex.test(value);
    }
    
    function calculateOrder() {
        hideAllMessages();
        
        const selectedProduct = productSelect.value;
        const quantityValue = quantityInput.value.trim();
        
        if (!selectedProduct) {
            errorText.textContent = 'Пожалуйста, выберите товар из списка';
            errorMessage.style.display = 'block';
            return;
        }
        
        if (!quantityValue) {
            quantityError.textContent = 'Пожалуйста, введите количество товара';
            quantityError.style.display = 'block';
            quantityInput.classList.add('is-invalid');
            return;
        }
        
        if (!validateQuantity(quantityValue)) {
            quantityError.textContent = 'Количество должно быть целым положительным числом (только цифры, больше 0)';
            quantityError.style.display = 'block';
            quantityInput.classList.add('is-invalid');
            return;
        }
        
        const price = parseInt(selectedProduct, 10);
        const quantity = parseInt(quantityValue, 10);
        const totalCost = price * quantity;
        
        const productName = productSelect.options[productSelect.selectedIndex].text.split(' - ')[0];
        const formattedTotal = totalCost.toLocaleString('ru-RU');
        
        resultText.textContent = `Товар: ${productName}\nОбщая стоимость: ${formattedTotal} руб.`;
        resultDiv.style.display = 'block';
    }
    
    function handleQuantityChange() {
        const value = quantityInput.value.trim();
        
        if (value && !validateQuantity(value)) {
            quantityError.style.display = 'block';
            quantityInput.classList.add('is-invalid');
        } else {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('is-invalid');
        }
        
        errorMessage.style.display = 'none';
    }
    
    function handleProductChange() {
        errorMessage.style.display = 'none';
    }
    
    function handleQuantityKeypress(event) {
        const charCode = event.which ? event.which : event.keyCode;
        
        if ([8, 9, 13, 27, 46].indexOf(charCode) !== -1 ||
            (charCode === 65 && event.ctrlKey === true) ||
            (charCode >= 35 && charCode <= 39)) {
            return;
        }
        
        if ((charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }
    
    calculateBtn.addEventListener('click', calculateOrder);
    quantityInput.addEventListener('input', handleQuantityChange);
    quantityInput.addEventListener('keypress', handleQuantityKeypress);
    productSelect.addEventListener('change', handleProductChange);
    
    quantityInput.addEventListener('focus', function() {
        hideAllMessages();
    });
    
    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculateOrder();
        }
    });
    
    console.log('Калькулятор стоимости заказа инициализирован');
});