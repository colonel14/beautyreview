"use client";

import axios from "axios";
import { useEffect } from "react";

function ClientLocal({ product, currentUser }) {
  useEffect(() => {
    async function handleProductView() {
      let storedCategories = localStorage.getItem("viewedCategories");
      if (!storedCategories) {
        storedCategories = [];
      } else {
        storedCategories = JSON.parse(storedCategories);
      }

      storedCategories.push(product.categoryId);

      localStorage.setItem(
        "viewedCategories",
        JSON.stringify(storedCategories)
      );
      if (currentUser) {
        let storedCategories = localStorage.getItem("viewedCategories");

        if (!storedCategories) {
          storedCategories = [];
        } else {
          storedCategories = JSON.parse(storedCategories);
        }
        storedCategories = storedCategories?.join(", ");
        const recommendation = await axios.post("/api/set-recommendation", {
          viewdCategories: storedCategories,
        });
      }
    }

    handleProductView();
  }, []);

  return "";
}

export default ClientLocal;
