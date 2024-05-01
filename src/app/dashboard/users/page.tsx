import Link from 'next/link'
import React from 'react'

function DashboardUsers() {
    return (
        <div>
            DashboardUsers

            <Link href="/dashboard" >
                Go To /Dashboard
            </Link>

            <Link href="/" >
                Go To /home
            </Link>
        </div>
    )
}

export default DashboardUsers