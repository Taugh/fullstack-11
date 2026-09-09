let url = "https://prismix.dev/api/v1/statuses"

let searchInput = document.querySelector("#service-search")
let searchButton = document.querySelector("#search-button")
let statusMessage = document.querySelector("#status-message")
let servicesGrid = document.querySelector("#services-grid")
let services = []

let escapeHtml = value => {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;")
}

let formatDate = dateString => {
	let date = new Date(dateString)
	if (Number.isNaN(date.getTime())) {
		return "Unknown"
	}
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date)
}

let formatRelativeDate = dateString => {
	let date = new Date(dateString)
	if (Number.isNaN(date.getTime())) {
		return "unknown"
	}
	let difference = Date.now() - date.getTime()
	let days = Math.round(difference / (1000 * 60 * 60 * 24))
	if (days <= 0) {
		return "today"
	}
	return `${days} day${days === 1 ? "" : "s"} ago`
}

let renderServiceCard = service => {
	let recentIssues = service.recentIncidentBriefs?.slice(0, 3) ?? []
	return `
		<article class="service-card">
			<div class="service-card__top">
				<div>
					<p class="service-card__label">Service</p>
					<h2>${escapeHtml(service.name)}</h2>
				</div>
				<span class="service-card__badge ${service.reachable ? "is-ok" : "is-alert"}">
					${service.reachable ? "Operational" : "Degraded"}
				</span>
			</div>
			<p class="service-card__description">${escapeHtml(service.description)}</p>
			<ul class="service-card__meta">
				<li><strong>Updated:</strong> ${formatDate(service.updatedAt)}</li>
				<li><strong>Recent issues:</strong> ${service.recentIncidents30d}</li>
				<li><strong>Last incident:</strong> ${service.lastIncidentAt ? formatRelativeDate(service.lastIncidentAt) : "none"}</li>
			</ul>
			<div class="service-card__issues">
				<h3>Recent incidents</h3>
				${recentIssues.length ? `
					<ul>
						${recentIssues
							.map(issue => `
								<li>
									<span>${escapeHtml(issue.name)}</span>
									<small>${escapeHtml(issue.impact)}</small>
								</li>
							`)
							.join("")}
					</ul>
				` : "<p>No recent incidents reported.</p>"}
			</div>
		</article>
	`
}

let renderServices = currentServices => {
	if (!currentServices.length) {
		servicesGrid.innerHTML = ""
		statusMessage.textContent = "No services match that search."
		return
	}

	servicesGrid.innerHTML = currentServices.map(renderServiceCard).join("")

	statusMessage.textContent = `Showing ${currentServices.length} service${currentServices.length === 1 ? "" : "s"}.`
}

let filterServices = () => {
	let query = searchInput.value.trim().toLowerCase()
	if (!query) {
		renderServices(services)
		return
	}

	let filteredServices = services.filter(service => {
		let searchableText = [
			service.name,
			service.description,
			service.recentIncidentBriefs?.map(issue => issue.name).join(" "),
		].join(" ").toLowerCase()
		return searchableText.includes(query)
	})

	renderServices(filteredServices)
}

let getData = async () => {
	try {
		let res = await fetch(url)
		let data = await res.json()
		services = data.services ?? []
		renderServices(services)
		searchInput.addEventListener("input", filterServices)
		searchButton.addEventListener("click", filterServices)
		searchInput.addEventListener("keydown", event => {
			if (event.key === "Enter") {
				event.preventDefault()
				filterServices()
			}
		})
	} catch(err) {
		statusMessage.textContent = "Unable to load services right now."
		servicesGrid.innerHTML = ""
		console.log(err)
	}
}

getData()
