"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Nav = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [providers, setProviders ] = useState(null)
    const [toggleDropdown, setToggleDropdown ] = useState(false)
    const [userImage, setUserImage] = useState('/images/default-profile.jpg')

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }

        setUpProviders()
    }, []) // [] means that useEffect will be run only once

    const getUserImage = async () => {
        try {
            const response = await fetch(`/api/users/${session.user.id}`)
            const data = await response.json()
            const userImage = data.image
            if (!response.ok) throw Error ('User image not found')

            setUserImage(userImage)
        } catch (error) {
            console.log(error.message)
        }
    }

    if (session?.user.id) {
        getUserImage()
    }
/*     useEffect(() => {
        
    }, []) */

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
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/add-tool" className="black_btn">
                            Add Tool
                        </Link>

                        <button type="button" className="outline_btn"
                        onClick={() => {
                            signOut({ callbackUrl: 'https://toolbox-app-delta.vercel.app/' })
                        }}
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                            src={userImage}
                            width={37}
                            height={37}
                            className="rounded-full object-cover h-[37px]"
                            priority
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
                                    onClick={() => signIn(provider.id, { callbackUrl: 'https://toolbox-app-delta.vercel.app/'})}
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
                {session?.user ? (
                    <div className="flex">
                        <Image
                        src={userImage}
                        width={37}
                        height={37}
                        className="rounded-full object-cover h-[37px]"
                        alt="profile"
                        priority
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
                                        signOut({ callbackUrl: 'https://toolbox-app-delta.vercel.app/' })
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
                                    onClick={() => signIn(provider.id, { callbackUrl: 'https://toolbox-app-delta.vercel.app/'})}
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