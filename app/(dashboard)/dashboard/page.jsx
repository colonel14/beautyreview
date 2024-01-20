import prismadb from "@/lib/prismadb";
import { Mails, Megaphone, Package, Users } from "lucide-react";
import React from "react";

export const dynamic = "force-dynamic";

async function HomePage() {
  const usersCount = await prismadb.user.count();
  const productsCount = await prismadb.product.count();
  const contactsCount = await prismadb.contact.count();
  const adsContactsCount = await prismadb.adcontact.count();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
            <div class="p-4 flex items-center">
              <div class="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
                <Users />
              </div>
              <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total clients
                </p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {usersCount}
                </p>
              </div>
            </div>
          </div>

          <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
            <div class="p-4 flex items-center">
              <div class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
                <Package />
              </div>
              <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Products
                </p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {productsCount}
                </p>
              </div>
            </div>
          </div>
          <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
            <div class="p-4 flex items-center">
              <div class="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
                <Mails />
              </div>
              <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Emails
                </p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {contactsCount}
                </p>
              </div>
            </div>
          </div>
          <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
            <div class="p-4 flex items-center">
              <div class="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
                <Megaphone />
              </div>
              <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ads Requests
                </p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {adsContactsCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
