import { useState } from "react";
import "./App.css";

function App() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [mode, setMode] = useState(null);

  const [formData, setFormData] = useState({});

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
  };

  const goBack = () => {
    setSelectedDomain(null);
    setMode(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Domain:", selectedDomain);
    console.log("Mode:", mode);
    console.log("Form Data:", formData);

    alert(
      `${mode === "sell" ? "Sell" : "Buy"} request submitted successfully!`
    );
  };

  // =========================
  // DOMAIN PAGE
  // =========================

  if (selectedDomain) {
    return (
      <div className="app">

        <header className="navbar">
          <div className="logo">VALUEVERSE</div>

          <button className="back-button" onClick={goBack}>
            ← Back to Domains
          </button>
        </header>

        <main className="domain-page">

          <div className="domain-page-icon">
            {domains.find(
              (d) => d.name === selectedDomain
            )?.icon}
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
            />
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

      <main className="main-container" id="home">

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
        >
          Submit Sell Request
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
        >
          Submit Buy Request
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