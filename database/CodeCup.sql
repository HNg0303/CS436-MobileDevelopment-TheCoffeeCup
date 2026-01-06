CREATE TABLE IF NOT EXISTS Coffee (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price REAL NOT NULL,
  image_url TEXT,
  description TEXT,
  points INTEGER
);

CREATE TABLE IF NOT EXISTS Customer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  loyalty_points INTEGER DEFAULT 0,
  profile_image TEXT,
  num_badges INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  coffee_id INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  total_amount REAL NOT NULL,
  quantity INTEGER NOT NULL,
  shot TEXT CHECK (shot IN ('single', 'double')),
  size TEXT CHECK (size IN ('small', 'medium', 'large')),
  ice TEXT CHECK (ice IN ('25%', '50%', 'Full Ice')),
  sel TEXT CHECK (sel IN ('iced', 'hot')),
  FOREIGN KEY (coffee_id) REFERENCES Coffee(id),
  FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- Table for historical orders (completed, cancelled, etc.)
CREATE TABLE IF NOT EXISTS OrderHistory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    coffee_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    quantity INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'refunded')), -- e.g., 'completed', 'cancelled', 'refunded'
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (coffee_id) REFERENCES Coffee(id)
);

-- Table to define points and badges for each product/item
CREATE TABLE IF NOT EXISTS Rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coffee_id INTEGER DEFAULT 0,
    name TEXT NOT NULL,
    description TEXT,
    points_required INTEGER NOT NULL,
    type TEXT NOT NULL DEFAULT 'free_item' CHECK (type IN ('free_item', 'discount', 'merchandise'))
);

-- Insert sample coffees (at least 6 for each type)
INSERT INTO Coffee (name, type, price, image_url, description, points) VALUES
  -- Coffee
  ('Americano', 'Coffee', 3.0, '/assets/americano.png', 'Classic Americano', 20),
  ('Cappuccino', 'Coffee', 3.5, '/assets/cappuccino.png', 'Rich Cappuccino', 20),
  ('Mocha', 'Coffee', 4.0, '/assets-images/mocha.png', 'Chocolatey Mocha', 20),
  ('Flat White', 'Coffee', 3.8, '/assets/images/flat-white.png', 'Smooth Flat White', 20),
  ('Latte', 'Coffee', 3.5, '/assets/latte.png', 'Creamy Latte', 20),
  ('Espresso', 'Coffee', 2.5, '/assets/espresso.png', 'Strong Espresso', 20),

  -- Milktea
  ('Classic Milktea', 'Milktea', 3.2, '/assets/classic-milktea.png', 'Classic Boba Milktea', 30),
  ('Taro Milktea', 'Milktea', 3.4, '/assets/taro-milktea.png', 'Sweet Taro Milktea', 30),
  ('Matcha Milktea', 'Milktea', 3.6, '/assets/matcha-milktea.png', 'Earthy Matcha Milktea', 30),
  ('Brown Sugar Milktea', 'Milktea', 3.8, '/assets/brown-sugar-milktea.png', 'Rich Brown Sugar Milktea', 30),
  ('Okinawa Milktea', 'Milktea', 3.8, '/assets/okinawa-milktea.png', 'Okinawa Style Milktea', 30),
  ('Honeydew Milktea', 'Milktea', 3.6, '/assets/honeydew-milktea.png', 'Fruity Honeydew Milktea', 30),

  -- Tea
  ('Green Tea', 'Tea', 2.8, '/assets/green-tea.png', 'Refreshing Green Tea', 35),
  ('Black Tea', 'Tea', 2.8, '/assets/black-tea.png', 'Classic Black Tea', 35),
  ('Oolong Tea', 'Tea', 3.0, '/assets/oolong-tea.png', 'Floral Oolong Tea', 35),
  ('Jasmine Tea', 'Tea', 3.0, '/assets/jasmine-tea.png', 'Aromatic Jasmine Tea', 35),
  ('Chamomile Tea', 'Tea', 3.2, '/assets/chamomile-tea.png', 'Calming Chamomile Tea', 35),
  ('Hibiscus Tea', 'Tea', 3.2, '/assets/hibiscus-tea.png', 'Tangy Hibiscus Tea', 35);

-- Insert a dummy customer
INSERT INTO Customer (name, email, phone, address, loyalty_points, profile_image, num_badges) VALUES
  ('Tran Thi Huyen Trang', 'thtrang12@gmail.com', '1234567890', 'Hoan Kiem, Ha Noi', 100, '../assets/images/Profile/htrang.jpg', 0);


-- Americano Reward
INSERT INTO Rewards (coffee_id, name, description, points_required, type)
VALUES (1, 'Americano', 'Redeem a free Americano', 100, 'free_item');

-- Matcha Milktea Reward
INSERT INTO Rewards (coffee_id, name, description, points_required, type)
VALUES (9, 'Matcha Milktea', 'Redeem a free Matcha Milktea', 120, 'free_item');

-- Green Tea Reward
INSERT INTO Rewards (coffee_id, name, description, points_required, type)
VALUES (13, 'Green Tea', 'Redeem a free Green Tea', 100, 'free_item');

