import { NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenu } from '@radix-ui/react-navigation-menu'
import Link from "next/link"
import React from 'react'
import { navigationMenuTriggerStyle } from './ui/navigation-menu'

export default function Navbar() {
  return (
    <div className='flex justify-center items-center mt-2'>
    <NavigationMenu >
    <NavigationMenuList>
    <NavigationMenuItem>
          <Link href="/todo/v1" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Todo Version 1
            </NavigationMenuLink>
          </Link>
          <Link href="/todo/v2" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Todo Version 2
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}
