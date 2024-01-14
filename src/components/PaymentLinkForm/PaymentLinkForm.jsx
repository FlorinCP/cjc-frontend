import React, { useEffect, useState } from "react";
import styles from "./PaymentLinkForm.module.css";
import ActionButton from "../ActionButton/ActionButton";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import getSessionLink from "../../services/stripe_api";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PaymentLinkForm({ sendPaymentLink }) {
  const location = useLocation();
  const { reuseLink } = location.state || {};

  const [serviceName, setServiceName] = useState(
    reuseLink ? reuseLink.serviceName : "",
  );
  const [servicePrice, setServicePrice] = useState(
    reuseLink ? formatNumber(reuseLink.servicePrice) : "",
  );
  const [currency, setCurrency] = useState(
    reuseLink ? reuseLink.currency : "ron",
  );
  const [returnedLink, setReturnedLink] = useState(null);
  const email = useSelector((state) => state.token.email);

  function formatNumber(num) {
    let numStr = num.toString();
    let len = numStr.length;

    // Inserting a comma two places from the end
    if (len > 2) {
      numStr = numStr.slice(0, len - 2) + "," + numStr.slice(len - 2);
    } else if (len === 2) {
      numStr = "0," + numStr;
    } else {
      numStr = "0,0" + numStr;
    }

    return numStr;
  }

  useEffect(() => {
    if (returnedLink) {
      sendPaymentLink(returnedLink);
    }
  }, [returnedLink]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const paymentLink = await getSessionLink(
        email,
        servicePrice,
        serviceName,
        currency,
      );
      setReturnedLink(paymentLink);
    } catch (error) {
      console.error("Error fetching payment link:", error);
    }
  };

  const currencyOptions = [
    { value: "ron", label: "RON" },
    { value: "eur", label: "EURO" },
    { value: "usd", label: "USD" },
  ];

  const handleInputChange = (e) => {
    const formattedValue = formatPrice(e.target.value);
    setServicePrice(formattedValue);
  };

  function formatPrice(value) {
    let cleanValue = value.replace(/\D/g, "");
    let intValue = parseInt(cleanValue, 10);
    let decimalValue = isNaN(intValue) ? 0 : intValue;
    let formattedValue = (decimalValue / 100).toFixed(2);
    return formattedValue.replace(".", ",");
  }

  const handleNameChange = (e) => {
    setServiceName(
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
    );
  };
  const suggestedPrices = [
    "200,00",
    "250,00",
    "300,00",
    "350,00",
    "400,00",
    "450,00",
  ];

  const handleOptionSelection = (price) => {
    if (servicePrice === price) {
      setServicePrice("");
    } else {
      setServicePrice(price);
    }
  };

  useEffect(() => {
    if (servicePrice) {
      console.log(servicePrice);
    }
  }, [servicePrice]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.inputField}>
            <label>Numele serviciului</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => handleNameChange(e)}
            />
          </div>
          <div className={styles.inputField}>
            <label>Prețul serviciului</label>
            <div className={styles.currencyWrapper}>
              <input
                className={styles.priceInput}
                type="text"
                placeholder={"0,00"}
                value={servicePrice}
                onChange={(e) => handleInputChange(e)}
              />
              <div>
                <div></div>
                <CustomDropdown
                  options={currencyOptions}
                  value={currency}
                  sendSelectedOption={(option) => setCurrency(option)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.suggestionsWrapper}>
          <p>Optiuni sugerate:</p>
          <div className={styles.suggestedPrices}>
            {suggestedPrices.map((price, index) => {
              return (
                <div
                  key={index}
                  className={
                    servicePrice === formatPrice(price)
                      ? styles.suggestedPriceSelected
                      : styles.suggestedPrice
                  }
                  onClick={() => handleOptionSelection(price)}
                >
                  {price}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <ActionButton
            width={"100%"}
            text={"Genereaza"}
            type={"submit"}
            color={"#1888ff"}
            backgroundColor={"white"}
          />
        </div>
      </form>
    </div>
  );
}
