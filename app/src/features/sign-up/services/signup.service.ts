import {
  getUsers,
  saveUsers
}
from "../utils/usersStorage"

import type {
  SignUpData
}
from "../types/signup.types"

export const registerUser =
  async (
    data: SignUpData
  ) => {

    const users =
      getUsers()

    const exists =
      users.some(
        user =>
          user.email ===
          data.email
      )

    if (exists) {
      throw new Error(
        "Email already exists"
      )
    }

    const names =
      data.fullName.trim().split(" ")

    const newUser = {

      id: Date.now(),

      username:
        data.email.split("@")[0],

      email:
        data.email,

      firstName:
        names[0],

      lastName:
        names.slice(1).join(" "),

      image: "",

      password:
        data.password
    }

    saveUsers([
      ...users,
      newUser
    ])

    return newUser
}