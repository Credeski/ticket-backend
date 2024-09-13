# 🎟️ Event Ticketing App

An Event Ticketing api where event organizers can create events, and users can browse through different events, buy tickets, and pay using Stripe. The api supports various ticket types, user roles, and secure payment integration for a seamless user experience.

<!-- ![Event Ticketing App Banner](https://via.placeholder.com/1200x300?text=Event+Ticketing+App) -->

## 📝 Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    

## ✨ Features

-   **Event Creation**: Event organizers can create and manage their events, set ticket prices, and availability.
-   **User Authentication**: Secure login and registration for different roles (Admin(Organiser), Normal User)).
-   **Ticket Purchase**: Users can browse events, select ticket types, and purchase tickets.
-   **Payment Integration**: Secure payments through Stripe.
-   **Order Management**: Track orders, send confirmation emails, and handle payment statuses.
-   **Admin Dashboard**: Admin users can manage events, users, and transactions.

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express, TypeScript
-   **Database**: PostgreSQL with Drizzle ORM
-   **Authentication**: JWT (JSON Web Tokens)
-   **Payments**: Stripe API
-   **Email Service**: Nodemailer

## 🚀 Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

-   **Node.js** (v14+)
-   **PostgreSQL** (v12+)
-   **Stripe Account** (for payment integration)
-   **Git**

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/event-ticketing-app.git
    cd event-ticketing-app
    ```

2. **Install dependicies**:

    ```bash
    npm install
    ```

3. **Set up DB**:

    ```bash
    npm db:update
    ```
