import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Stack, TextField, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { Alert, AlertTitle } from "@mui/material";
import Link from "next/link"
import { LockClosedIcon } from '@heroicons/react/20/solid'

const Signup = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successVisible, setSuccessVisible] = useState(false)
    const [errorVisible, setErrorVisible] = useState(false)
    const [warnVisible, setWarnVisible] = useState(false)


    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }

        else if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })
        let response = res.json()
        if (res.status == 200) {
            setSuccessVisible(true)
            setTimeout(() => setSuccessVisible(false), 3000)
            setName('')
            setEmail('')
            setPassword('')
            router.push('/')
        }
        if (res.status == 301) {
            setWarnVisible(true)
            setTimeout(() => setWarnVisible(false), 3000)

        } else {
            setErrorVisible(true)
            setTimeout(() => setErrorVisible(false), 3000)
        }
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard>

                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                    Create your Free account
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Or{' '}
                                    <Link href="/auth/login"><a className="font-medium text-[#03c9d7] hover:text-[#03c9d7]">
                                        Login
                                    </a></Link>
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="-space-y-px rounded-md shadow-sm">
                                    <div>
                                        <label htmlFor="name" className="sr-only">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="current-name"
                                            required
                                            onChange={handleChange}
                                            value={name}
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#03c9d7] focus:outline-none focus:ring-[#03c9d7] sm:text-sm"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            onChange={handleChange}
                                            value={email}
                                            required
                                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#03c9d7] focus:outline-none focus:ring-[#03c9d7] sm:text-sm"
                                            placeholder="Email address"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="sr-only">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            onChange={handleChange}
                                            value={password}
                                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#03c9d7] focus:outline-none focus:ring-[#03c9d7] sm:text-sm"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#03c9d7] py-2 px-4 text-sm font-medium text-white hover:bg-[#00d4e3] focus:outline-none focus:ring-2 focus:ring-[#03c9d7] focus:ring-offset-2"
                                    >
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <LockClosedIcon className="h-5 w-5 text-[#279ea7] group-hover:text-[#1da6af]" aria-hidden="true" />
                                        </span>
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            {errorVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        <strong className='cursor-pointer'>Sorry!</strong> We are unable to resigister you.
                                    </Alert>}
                                    {warnVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="warning">
                                        <AlertTitle>Warning</AlertTitle>
                                        User Already exists
                                    </Alert>}
                                    {successVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="success">
                                        <AlertTitle>Success</AlertTitle>
                                        You are registered succesfully Please<Link href="/auth/login"><strong className='cursor-pointer'> Confirm </strong></Link>your email!
                                    </Alert>}
                </BaseCard>
            </Grid>
        </Grid>
    );
};

export default Signup;
