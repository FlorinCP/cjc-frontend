import React, { useEffect, useState } from "react";
import styles from "./PaymentLinkForm.module.css";
import ActionButton from "../ActionButton/ActionButton";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import getSessionLink from "../../services/stripe_api";
import { useSelector } from "react-redux";

export default function PaymentLinkForm({ sendPaymentLink }) {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [currency, setCurrency] = useState("ron");
  const [returnedLink, setReturnedLink] = useState(null);
  const email = useSelector((state) => state.token.email);

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
    return  formattedValue.replace(".", ",");
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
                  className={servicePrice === formatPrice(price) ? styles.suggestedPriceSelected : styles.suggestedPrice}
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
