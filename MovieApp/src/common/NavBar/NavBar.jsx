import React, { useEffect, useRef, useState } from 'react'
import './NavBar.css'
import { cn } from '../../components/lib/utils'
import { Link } from 'react-router'

export default function NavBar({ onNavigate, activeLink }) {
	const navRef = useRef(null)
	const highlightRef = useRef(null)
	const [active, setActive] = useState(activeLink || 'home')

	const links = [
		{ id: 'home', label: 'Home', href: 'home' },
		{ id: 'trending', label: 'Trending', href: 'trending' },
		{ id: 'genres', label: 'Genres', href: 'genres' },
		{ id: 'favourites', label: 'Favourites', href: 'favourites' },
		{ id: 'search', label: 'Search', href: 'search' },
	]

	const backgroundColor = 'rgba(15,15,20,0.8)'
	const textColor = '#e5e7eb'
	const highlightColor = 'rgba(255,255,255,0.07)'
	const glowIntensity = 6

	const updateHighlightPosition = (id) => {
		if (!navRef.current || !highlightRef.current) return
		const linkElement = navRef.current.querySelector(`#nav-item-${id || active}`)
		if (!linkElement) return
		const { left, width } = linkElement.getBoundingClientRect()
		const navRect = navRef.current.getBoundingClientRect()
		highlightRef.current.style.transform = `translateX(${left - navRect.left}px)`
		highlightRef.current.style.width = `${width}px`
	}

	const handleLinkClick = (id, event) => {
		event?.preventDefault()
		setActive(id)
		onNavigate?.(id)
	}

	const handleLinkHover = (id) => {
		updateHighlightPosition(id)
	}

	useEffect(() => {
		updateHighlightPosition()
		const onResize = () => updateHighlightPosition()
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [active, links])

	useEffect(() => {
		if (activeLink && activeLink !== active) setActive(activeLink)
	}, [activeLink])

	return (
		<nav
			ref={navRef}
			className={cn('ci-nav', 'border')}
			style={{ color: textColor }}
		>
			<div ref={highlightRef} className="ci-nav__highlight" style={{ backgroundColor: highlightColor }} />
			<ul className="ci-nav__list">
				{links.map((link) => (
					<li key={link.id} className="ci-nav__item" id={`nav-item-${link.id}`}>
						<Link to={link.href === 'home' ? `/` : `/${link.href}`}
							className={cn('ci-nav__link', active === link.id && 'is-active')}
							// onClick={(e) => handleLinkClick(link.id, e)}
							onMouseEnter={() => handleLinkHover(link.id)}>
							{link.label}
						</Link>

					</li>
				))}
			</ul>
		</nav>
	)
}
