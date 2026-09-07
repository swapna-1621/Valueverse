import { useState } from "react";
import "./App.css";

function App() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [mode, setMode] = useState(null);

  const [formData, setFormData] = useState({});

  // Backend result
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const domains = [
    {
      name: "Waste2Value",
      icon: "♻️",
      description: "Convert unused waste into valuable resources.",
    },
    {
      name: "Food2Value",
      icon: "🍱",
      description: "Recover and redistribute surplus food.",
    },
    {
      name: "Fashion2Value",
      icon: "👕",
      description: "Reuse, resell and recover value from fashion.",
    },
    {
      name: "E2Value",
      icon: "💻",
      description: "Recover value from unused electronic devices.",
    },
    {
      name: "Repair2Value",
      icon: "🔧",
      description: "Repair and extend the life of products.",
    },
  ];

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setMode(null);
    setFormData({});
    setResult(null);
    setError("");
  };

  const goBack = () => {
    setSelectedDomain(null);
    setMode(null);
    setFormData({});
    setResult(null);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear old messages when user changes input
    setResult(null);
    setError("");
  };

  // =================================================
  // SEND FORM DATA TO FASTAPI BACKEND
  // =================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // ---------------------------------------------
      // Find the correct "item" value based on domain
      // ---------------------------------------------

      let item = "";

      if (selectedDomain === "Waste2Value") {
        item = formData.wasteType;
      } else if (selectedDomain === "Food2Value") {
        item = formData.foodType;
      } else if (selectedDomain === "Fashion2Value") {
        item = formData.clothingType;
      } else if (selectedDomain === "E2Value") {
        item = formData.deviceType;
      } else if (selectedDomain === "Repair2Value") {
        item = formData.product;
      }

      // ---------------------------------------------
      // Create data for backend
      // ---------------------------------------------

      const dataToSend = {
        item: item,
        location: formData.location,
      };

      // ---------------------------------------------
      // Add quantity only when the form has quantity
      // ---------------------------------------------

      if (formData.quantity !== undefined && formData.quantity !== "") {
        const numericQuantity = parseFloat(formData.quantity);

        if (!isNaN(numericQuantity)) {
          dataToSend.quantity = numericQuantity;
        }
      }

      console.log("Sending to backend:", dataToSend);

      // ---------------------------------------------
      // Send request to FastAPI
      // ---------------------------------------------

      const response = await fetch(
        "http://127.0.0.1:8000/api/value",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(dataToSend),
        }
      );

      // ---------------------------------------------
      // Check backend response
      // ---------------------------------------------

      if (!response.ok) {
        throw new Error(
          `Backend error: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Backend response:", data);

      // ---------------------------------------------
      // Display backend result
      // ---------------------------------------------

      setResult(data);

    } catch (err) {
      console.error("Error connecting to backend:", err);

      setError(
        "Unable to connect to the backend. Make sure the FastAPI server is running on http://127.0.0.1:8000."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DOMAIN PAGE
  // =========================

  if (selectedDomain) {
    return (
      <div className="app">

        <header className="navbar">

          <div className="logo">VALUEVERSE</div>

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back to Domains
          </button>

        </header>

        <main className="domain-page">

          <div className="domain-page-icon">
            {
              domains.find(
                (d) => d.name === selectedDomain
              )?.icon
            }
          </div>

          <h1>{selectedDomain}</h1>

          <p className="domain-page-description">
            {
              domains.find(
                (d) => d.name === selectedDomain
              )?.description
            }
          </p>

          {/* SELL / BUY SELECTION */}

          {!mode && (
            <section className="mode-section">

              <h2>What do you want to do?</h2>

              <p>Select an option to continue</p>

              <div className="mode-grid">

                <button
                  className="mode-card"
                  onClick={() => setMode("sell")}
                >
                  <span>🏷️</span>

                  <h3>SELL</h3>

                  <p>
                    I have a resource or product that I
                    want to sell.
                  </p>

                </button>

                <button
                  className="mode-card"
                  onClick={() => setMode("buy")}
                >
                  <span>🛒</span>

                  <h3>BUY</h3>

                  <p>
                    I am looking for a resource or
                    product to buy.
                  </p>

                </button>

              </div>

            </section>
          )}

          {/* SELL FORM */}

          {mode === "sell" && (
            <SellForm
              domain={selectedDomain}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setMode={setMode}
              loading={loading}
            />
          )}

          {/* BUY FORM */}

          {mode === "buy" && (
            <BuyForm
              domain={selectedDomain}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setMode={setMode}
              loading={loading}
            />
          )}

          {/* =========================
              BACKEND RESULT
          ========================= */}

          {result && (
            <section
              style={{
                marginTop: "30px",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                background: "#f8fff8",
              }}
            >
              <h2>Backend Response</h2>

              <p>
                <strong>Message:</strong>{" "}
                {result.message}
              </p>

              <p>
                <strong>Item:</strong>{" "}
                {result.item}
              </p>

              {result.quantity !== undefined && (
                <p>
                  <strong>Quantity:</strong>{" "}
                  {result.quantity}
                </p>
              )}

              <p>
                <strong>Location:</strong>{" "}
                {result.location}
              </p>
            </section>
          )}

          {/* =========================
              ERROR MESSAGE
          ========================= */}

          {error && (
            <section
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ffcccc",
                background: "#fff5f5",
              }}
            >
              <p style={{ margin: 0 }}>
                ❌ {error}
              </p>
            </section>
          )}

        </main>

      </div>
    );
  }

  // =========================
  // MAIN DASHBOARD
  // =========================

  return (
    <div className="app">

      <header className="navbar">

        <div className="logo">VALUEVERSE</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#domains">Domains</a>
          <a href="#about">About</a>
        </nav>

      </header>

      <main
        className="main-container"
        id="home"
      >

        <section className="hero">

          <h1>
            Turn Unused Resources Into Value
          </h1>

          <p>
            Discover, recover, reuse and exchange
            resources through ValueVerse.
          </p>

        </section>

        <section
          className="domains-section"
          id="domains"
        >

          <h2>Select a ValueVerse Domain</h2>

          <p className="subtitle">
            Choose a domain to continue
          </p>

          <div className="domain-grid">

            {domains.map((domain) => (

              <button
                key={domain.name}
                type="button"
                className="domain-card"
                onClick={() =>
                  handleDomainSelect(domain.name)
                }
              >

                <span className="domain-icon">
                  {domain.icon}
                </span>

                <h3>{domain.name}</h3>

                <p>{domain.description}</p>

                <span className="domain-arrow">
                  →
                </span>

              </button>

            ))}

          </div>

        </section>

      </main>

      <footer id="about">
        <p>© 2026 ValueVerse</p>
      </footer>

    </div>
  );
}


// =================================================
// SELL FORM
// =================================================

function SellForm({
  domain,
  formData,
  handleChange,
  handleSubmit,
  setMode,
  loading,
}) {

  return (
    <section className="form-section">

      <button
        className="form-back-button"
        onClick={() => setMode(null)}
      >
        ← Back to Sell / Buy
      </button>

      <h2>Sell on {domain}</h2>

      <p>
        Tell us about the resource you want to sell.
      </p>

      <form
        className="value-form"
        onSubmit={handleSubmit}
      >

        {/* WASTE */}

        {domain === "Waste2Value" && (
          <>
            <FormInput
              label="Waste Type"
              name="wasteType"
              placeholder="Example: Plastic, Paper, Metal"
              value={formData.wasteType || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Quantity"
              name="quantity"
              placeholder="Example: 50 kg"
              value={formData.quantity || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Condition"
              name="condition"
              placeholder="Example: Clean, Mixed, Damaged"
              value={formData.condition || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* FOOD */}

        {domain === "Food2Value" && (
          <>
            <FormInput
              label="Food Type"
              name="foodType"
              placeholder="Example: Fruits, Vegetables, Packaged Food"
              value={formData.foodType || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Quantity"
              name="quantity"
              placeholder="Example: 20 kg"
              value={formData.quantity || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Expiry Date"
              name="expiryDate"
              type="date"
              value={formData.expiryDate || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Food Condition"
              name="condition"
              placeholder="Example: Fresh, Good, Near Expiry"
              value={formData.condition || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* FASHION */}

        {domain === "Fashion2Value" && (
          <>
            <FormInput
              label="Clothing Type"
              name="clothingType"
              placeholder="Example: Shirt, Jeans, Saree"
              value={formData.clothingType || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Size"
              name="size"
              placeholder="Example: M, L, XL"
              value={formData.size || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Quantity"
              name="quantity"
              placeholder="Example: 5"
              value={formData.quantity || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Condition"
              name="condition"
              placeholder="Example: New, Good, Used"
              value={formData.condition || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Expected Price"
              name="price"
              placeholder="₹"
              value={formData.price || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* ELECTRONICS */}

        {domain === "E2Value" && (
          <>
            <FormInput
              label="Device Type"
              name="deviceType"
              placeholder="Example: Laptop, Mobile, TV"
              value={formData.deviceType || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Brand"
              name="brand"
              placeholder="Example: Dell, Samsung, Apple"
              value={formData.brand || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Model"
              name="model"
              placeholder="Enter model"
              value={formData.model || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Working Condition"
              name="condition"
              placeholder="Example: Working, Partially Working"
              value={formData.condition || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Age"
              name="age"
              placeholder="Example: 2 years"
              value={formData.age || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Expected Price"
              name="price"
              placeholder="₹"
              value={formData.price || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* REPAIR */}

        {domain === "Repair2Value" && (
          <>
            <FormInput
              label="Product"
              name="product"
              placeholder="Example: Laptop, Phone, Furniture"
              value={formData.product || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Problem / Damage"
              name="damage"
              placeholder="Describe the problem"
              value={formData.damage || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Current Condition"
              name="condition"
              placeholder="Example: Minor Damage, Major Damage"
              value={formData.condition || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Submit Sell Request"}
        </button>

      </form>

    </section>
  );
}


// =================================================
// BUY FORM
// =================================================

function BuyForm({
  domain,
  formData,
  handleChange,
  handleSubmit,
  setMode,
  loading,
}) {

  return (
    <section className="form-section">

      <button
        className="form-back-button"
        onClick={() => setMode(null)}
      >
        ← Back to Sell / Buy
      </button>

      <h2>Buy through {domain}</h2>

      <p>
        Tell us what resource you are looking for.
      </p>

      <form
        className="value-form"
        onSubmit={handleSubmit}
      >

        {/* WASTE */}

        {domain === "Waste2Value" && (
          <>
            <FormInput
              label="Material Required"
              name="material"
              placeholder="Example: Plastic, Metal, Paper"
              value={formData.material || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Quantity Required"
              name="quantity"
              placeholder="Example: 100 kg"
              value={formData.quantity || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Budget"
              name="budget"
              placeholder="₹"
              value={formData.budget || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* FOOD */}

        {domain === "Food2Value" && (
          <>
            <FormInput
              label="Food Type"
              name="foodType"
              placeholder="Example: Fruits, Vegetables"
              value={formData.foodType || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Quantity Required"
              name="quantity"
              placeholder="Example: 10 kg"
              value={formData.quantity || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Required Date"
              name="requiredDate"
              type="date"
              value={formData.requiredDate || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Budget"
              name="budget"
              placeholder="₹"
              value={formData.budget || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* FASHION */}

        {domain === "Fashion2Value" && (
          <>
            <FormInput
              label="Clothing Type"
              name="clothingType"
              placeholder="Example: Shirt, Jeans, Saree"
              value={formData.clothingType || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Size"
              name="size"
              placeholder="Example: M, L, XL"
              value={formData.size || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Quantity Required"
              name="quantity"
              placeholder="Example: 3"
              value={formData.quantity || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Condition Required"
              name="condition"
              placeholder="Example: New, Good, Used"
              value={formData.condition || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Maximum Budget"
              name="budget"
              placeholder="₹"
              value={formData.budget || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* ELECTRONICS */}

        {domain === "E2Value" && (
          <>
            <FormInput
              label="Device Type"
              name="deviceType"
              placeholder="Example: Laptop, Mobile, TV"
              value={formData.deviceType || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Preferred Brand"
              name="brand"
              placeholder="Example: Dell, Samsung, Apple"
              value={formData.brand || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Required Condition"
              name="condition"
              placeholder="Example: New, Good, Working"
              value={formData.condition || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Budget"
              name="budget"
              placeholder="₹"
              value={formData.budget || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Quantity Required"
              name="quantity"
              placeholder="Example: 1"
              value={formData.quantity || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        {/* REPAIR */}

        {domain === "Repair2Value" && (
          <>
            <FormInput
              label="Product Needed"
              name="product"
              placeholder="Example: Laptop, Phone, Furniture"
              value={formData.product || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Repair Requirement"
              name="repairRequirement"
              placeholder="Describe what needs repair"
              value={formData.repairRequirement || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Budget"
              name="budget"
              placeholder="₹"
              value={formData.budget || ""}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              placeholder="Enter your location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Submit Buy Request"}
        </button>

      </form>

    </section>
  );
}


// =================================================
// REUSABLE INPUT COMPONENT
// =================================================

function FormInput({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) {

  return (
    <div className="form-group">

      <label>{label}</label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />

    </div>
  );
}

export default App;