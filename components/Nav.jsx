"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true

    const [providers, setProviders ] = useState(null)
    const [toggleDropdown, setToggleDropdown ] = useState(false)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }

        setProviders()
    }, []) // [] means that useEffect will be run only once

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image 
                    src="/images/toolbox.png"
                    alt="Toolbox Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">ToolBox</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/add-tool" className="black_btn">
                            Add Tool
                        </Link>

                        <button type="button" className="outline_btn" onClick={signOut}>
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                            src="/images/5.png"
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            />
                        </Link>
                    </div>
                ): (
                    <>
                        {providers && 
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
            
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                        src="/images/5.png"
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                        onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href="/add-tool"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Add Tool
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ): (
                    <>
                        {providers && 
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                </> 
                )}
            </div>
        </nav>
  )
}

export default Nav