/*
  # Create users table and authentication setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `email_confirmed_at` (timestamp)
      - `last_sign_in_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users to read their own data
    - Create trigger to handle new user creation

  3. Functions
    - Create function to handle new user registration
    - Create function to update user last sign in
*/

-- Create users table (this extends Supabase's auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  email_confirmed_at timestamptz,
  last_sign_in_at timestamptz
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, email, email_confirmed_at, last_sign_in_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.email_confirmed_at,
    NEW.last_sign_in_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;

-- Create function to update last sign in
CREATE OR REPLACE FUNCTION update_user_last_sign_in()
RETURNS trigger AS $$
BEGIN
  UPDATE users 
  SET 
    last_sign_in_at = NEW.last_sign_in_at,
    updated_at = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for sign in updates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_updated'
  ) THEN
    CREATE TRIGGER on_auth_user_updated
      AFTER UPDATE ON auth.users
      FOR EACH ROW 
      WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
      EXECUTE FUNCTION update_user_last_sign_in();
  END IF;
END $$;