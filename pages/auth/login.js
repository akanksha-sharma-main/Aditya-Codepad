import React, { useState } from 'react'
import { useRouter } from 'next/router'
import BaseCard from "../../src/components/baseCard/BaseCard";
import { Alert, AlertTitle, Grid } from "@mui/material";
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/20/solid'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successVisible, setSuccessVisible] = useState(false)
    const [errorVisible, setErrorVisible] = useState(false)
    const [warnVisible, setWarnVisible] = useState(false)

    const handleChange = (e) => {

        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email && password != '') {
            let res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            let response = await res.json()
            if (response.success) {
                setSuccessVisible(true)
                setTimeout(() => setSuccessVisible(false), 3000)
                await localStorage.setItem("token", JSON.stringify(response.token))
                setEmail('')
                setPassword('')
                await router.push('/')
            }
            else if (response.invalid) {
                setWarnVisible(true)
                setTimeout(() => setWarnVisible(false), 3000)
            } else {
                await setErrorVisible(true)
                await setTimeout(() => setErrorVisible(false), 3000)
            }
        }

    }
    const router = useRouter()
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/auth/signup"><a className="font-medium text-[#03c9d7] hover:text-[#03c9d7]">
                SignUp
              </a></Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
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
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#03c9d7] focus:outline-none focus:ring-[#03c9d7] sm:text-sm"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#03c9d7] focus:ring-[#03c9d7]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot"><a className="font-medium text-[#03c9d7] hover:text-[#03c9d7]">
                  Forgot your password?
                </a></Link>
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    
                        {errorVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong className='cursor-pointer'>Sorry!</strong> We are unable to login you.
                        </Alert>}
                        {warnVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            Invalid Credentials
                        </Alert>}
                        {successVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            You are login succesfully Please Confirm your email!
                        </Alert>}
                </BaseCard>
            </Grid>
        </Grid>
    );
};

export default Login;
