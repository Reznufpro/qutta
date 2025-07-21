import { BASE_URL } from "@/constants";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}auth/checkEmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  return data.exists === true;
};

export const registerUser = async (data: {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Registration failed");
  }

  return res.json(); // returns { user, token }
};
