import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Stack, TextField, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { Alert, AlertTitle } from "@mui/material";
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/20/solid'

const AddMovie = () => {
    const [email, setEmail] = useState('')
    const [successVisible, setSuccessVisible] = useState(false)
    const [errorVisible, setErrorVisible] = useState(false)
    const [warnVisible, setWarnVisible] = useState(false)

    const handleChange = (e) => {

        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email != '') {
            let res = await fetch('/api/forgot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            let response = await res.json()
            if (response.resetId) {
                setSuccessVisible(true)
                setTimeout(() => setSuccessVisible(false), 3000)
                setEmail('')
                await router.push('/auth/login')
            }
            else if (!response.success) {
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
              Forgot Password
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
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#03c9d7] focus:outline-none focus:ring-[#03c9d7] sm:text-sm"
                  placeholder="Email address"
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
                Send reset link
              </button>
            </div>
          </form>
        </div>
      </div>
    
                        {errorVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong className='cursor-pointer'>Sorry!</strong> We are unable to reset your Password.
                        </Alert>}
                        {warnVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            No user Found with this email.
                        </Alert>}
                        {successVisible && <Alert className={`fixed bottom-2 right-2 z-50`} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            You reset passsword link is sent successfully to your email.
                        </Alert>}
                </BaseCard>
            </Grid>
        </Grid>
    );
};

export default AddMovie;
