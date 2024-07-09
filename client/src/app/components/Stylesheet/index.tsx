import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

enum Site {
    admin = '/admin'
}

export default function Stylesheet() {
    const location = useLocation();
    const currentSite = (location.pathname.startsWith(Site.admin)) ? 'admin' : 'user';
    const [site, setSite] = useState(currentSite);
    useEffect(() => {
        if (location.pathname.startsWith(Site.admin)) {
            setSite('admin');
        } else setSite('user');
    }, [location])
    return (
        <>
            {site === 'user' && 
                <>
                    <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css0fbc2a0d34a17a5a87b666cddd4f967ee39db9ec52c41b048e.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css2223b70a3b024a4b7a53c83b65b84a1eeeca04f6dee0080615.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-csse408a51631693ab13d3495b2a314e63b3a24683d1a69c0fce7.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css915502b899b1db9b0d39ad5bf7a8748897707d8fa8e7755050.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css6fd4ca8903ad86929d884826e10d2e5f35ec5f9da208184a80.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-cssd4116f064588971c526c979a852905cd805ebec35135c2b87e.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css212831beb50e35397be118ddf33792d6c866185b306aad5337.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-cssb6f4b559ec762b7f50e6bb58065593df5ee60f663e33f02b49.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-csse08c8be733a1a66e6e158daea1a0bf8e2eb5901ad98c058c01.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css11059176d3c6d0532b7643d838eca9977edf147cf66b1125b6.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css3c6b50fb51c6b3bc329e63fd11871e71eb35102970410b3604.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css395766a1cca089e7708c4eabc6cd4f667a0e65ecb131a79211.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css2be8e92fdd79a2f8d5c1aa951815ed118021cd96e1264cf5e4.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-cssda25e4930285ab851ded080334fed32503a64d0e6e96441c79.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-cssd76faf414817a7e6734616ac1cbc7e00e0418efc7b4a1e7507.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css79b9647ef9cdf741e2fe827a40d2262f76f73ff1c01bc9e64b.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-cssd91078818d119dd50b7e23018dc3a1c8d65ab9af5ed7f641ba.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-css80582003e8a1167ea158634a4a315e8c89174d3bf0f611e43f.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-cssc9d7493f2b232e19c637d7a8e4f6b2d7ade61497304e3a91eb.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/1705087579-cssc4c8a460dd7141506855fda78178d4f7ac8dfa40efc97949bc.css`}
                        type="text/css"
                        media="all"
                        />
                        <link
                        rel="stylesheet"
                        href={`${process.env.PUBLIC_URL}/css/custom.css`}
                        type="text/css"
                        media="all"
                        />
                </>
            }
            {site === 'admin' &&
                <>
                    <link href={`${process.env.PUBLIC_URL}/css/css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/simple-line-icons.min.css`} rel="stylesheet" type="text/css" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.css" rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/material-icon.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/bootstrap.min.css`} rel="stylesheet" type="text/css" />
                    <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/css/material.min.css`} />
                    <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/css/material_style.css`} />
                    <link href={`${process.env.PUBLIC_URL}/css/theme_style.css`} rel="stylesheet" id="rt_style_components" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/plugins.min.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/style.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/responsive.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/theme-color.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/admin-custom.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.PUBLIC_URL}/css/login.css`} rel="stylesheet" type="text/css" />
                </>
            }
        </>

    )
}