import pandas as pd
import streamlit as st
import matplotlib.pyplot as plt

st.set_page_config(page_title="Blinkit Mini Dashboard", layout="wide")

st.title("📊 Blinkit Mini – Analytics Dashboard")

# Load data
df = pd.read_csv("blinkit_orders.csv")

st.subheader("Raw Order Data")
st.dataframe(df)

# KPIs
total_orders = df["Order"].nunique()
total_items = df["Quantity"].sum()

# fake prices for now (later we map real prices)
avg_price = 50
revenue = total_items * avg_price

c1, c2, c3 = st.columns(3)
c1.metric("Total Orders", total_orders)
c2.metric("Total Items Sold", total_items)
c3.metric("Estimated Revenue (₹)", revenue)

# Product performance
product_sales = df.groupby("Item")["Quantity"].sum().sort_values(ascending=False)

st.subheader("Top Selling Products")
st.bar_chart(product_sales)

# Pie chart
fig, ax = plt.subplots()
ax.pie(product_sales.head(5), labels=product_sales.head(5).index, autopct="%1.1f%%")
ax.set_title("Top 5 Products Share")

st.pyplot(fig)
