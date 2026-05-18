import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { AuthInput } from "../AuthInput/AuthInput"
import { AuthButton } from "../AuthButton/AuthButton"

import { useAuth } from "../../context/useAuth"

import "./LoginForm.css"

export const LoginForm = () => {

    const navigate = useNavigate()

    const { login } = useAuth()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault()

        if (!form.username || !form.password) {
            toast.error("All fields are required")
            return
        }

        try {

            setLoading(true)

            await login({
                username: form.username,
                password: form.password
            })

            toast.success("Welcome back!")

            navigate("/")

        } catch (error) {

            console.error(error)

            toast.error("Invalid credentials")

        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
        >

            <AuthInput
                name="username"
                label="Username"
                icon="alternate_email"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
            />

            <AuthInput
                name="password"
                label="Password"
                type="password"
                icon="lock"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
            />

            <div className="login-form-button">

                <AuthButton
                    type="submit"
                    disabled={loading}
                    text={
                        loading
                            ? "LOGGING IN..."
                            : "LOG IN"
                    }
                />

            </div>

        </form>
    )
}