import React from "react"
import {useRouter} from "next/router"
import Layout from "../../../components/Layout"

export default function Episode() {
    const router = useRouter()
    const {slug} = router.query
    console.log(router)
    return (
        <Layout title="Test Title">
            {slug}
        </Layout>
    )
}