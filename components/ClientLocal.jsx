"use client";

import { useEffect } from "react";

function ClientLocal({ product, currentUser }) {
  useEffect(() => {
    function handleProductView() {
      console.log("run the hnaldeProductView");

      if (!currentUser) {
        let storedCategories = localStorage.getItem("viewedCategories");

        if (!storedCategories) {
          storedCategories = [];
        } else {
          storedCategories = JSON.parse(storedCategories);
        }

        if (!storedCategories.includes(product.categoryId)) {
          storedCategories.push(product.categoryId);
        }

        localStorage.setItem(
          "viewedCategories",
          JSON.stringify(storedCategories)
        );
      }
    }

    handleProductView();
  }, []);

  return "";
}

export default ClientLocal;
