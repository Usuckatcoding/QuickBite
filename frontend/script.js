  // JavaScript Code
    document.addEventListener("DOMContentLoaded", () => {
      const menuPage = document.getElementById("menu-page");
      const summaryPage = document.getElementById("summary-page");
      const paymentPage = document.getElementById("payment-page");
      const preparationPage = document.getElementById("preparation-page");
      const qrPage = document.getElementById("qr-page");
      const deliveredPage = document.getElementById("delivered-page");
      const orderBtn = document.getElementById("order-btn");
      const payBtn = document.getElementById("pay-btn");

      let selectedItems = [];
      let totalAmount = 0;

      // Add event listeners to all +/- buttons
      document.querySelectorAll(".item-row").forEach((row) => {
        const minusBtn = row.querySelector(".btn-minus");
        const plusBtn = row.querySelector(".btn-plus");
        const quantitySpan = row.querySelector(".quantity");

        minusBtn.addEventListener("click", () => {
          let quantity = parseInt(quantitySpan.textContent);
          if (quantity > 0) {
            quantity--;
            quantitySpan.textContent = quantity;
          }
        });

        plusBtn.addEventListener("click", () => {
          let quantity = parseInt(quantitySpan.textContent);
          quantity++;
          quantitySpan.textContent = quantity;
        });
      });

      // Handle Place Order button click
      orderBtn.addEventListener("click", () => {
        selectedItems = [];
        totalAmount = 0;

        document.querySelectorAll(".item-row").forEach((row) => {
          const itemName = row.getAttribute("data-item");
          const itemPrice = parseInt(row.getAttribute("data-price"));
          const quantity = parseInt(row.querySelector(".quantity").textContent);

          if (quantity > 0) {
            selectedItems.push({ name: itemName, price: itemPrice, quantity });
            totalAmount += itemPrice * quantity;
          }
        });

        if (selectedItems.length === 0) {
          alert("Please select at least one item to place an order.");
          return;
        }

        // Display summary page
        menuPage.style.display = "none";
        summaryPage.style.display = "block";

        const summaryItemsDiv = document.getElementById("summary-items");
        summaryItemsDiv.innerHTML = ""; // Clear previous items

        selectedItems.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "summary-item";
          itemDiv.textContent = `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`;
          summaryItemsDiv.appendChild(itemDiv);
        });

        document.getElementById("total-amount").textContent = `Total: ₹${totalAmount}`;
      });

      // Handle Pay button click
      payBtn.addEventListener("click", () => {
        summaryPage.style.display = "none";
        paymentPage.style.display = "block";
      });

      // Handle Payment Options
      document.querySelectorAll(".payment-option").forEach((option) => {
        option.addEventListener("click", () => {
          alert(`Payment via ${option.textContent} successful!`);
          paymentPage.style.display = "none";
          preparationPage.style.display = "block";

          // Simulate order preparation
          setTimeout(() => {
            preparationPage.style.display = "none";
            qrPage.style.display = "block";

            // Simulate QR code scanning after 10 seconds
            setTimeout(() => {
              qrPage.style.display = "none";
              deliveredPage.style.display = "block";
            }, 10000); // 10 seconds delay
          }, 10000); // 10 seconds delay
        });
      });
    });