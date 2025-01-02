const languageSelect = document.getElementById('language-select');
const repoDisplay = document.querySelector('.repo-display');

languageSelect.addEventListener("change", async () => {
    const lang = languageSelect.value;
    if (lang) {
        repoDisplay.textContent = `Fetching a repository for ${lang}...`;
        
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc&per_page=100`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
    
            const data = await response.json();
            console.log(data);
            const repos = data.items;
    
            const randomRepo = repos[Math.floor(Math.random() * repos.length)];

            repoDisplay.innerHTML = `<p>Repository:</p> <a href="${randomRepo.html_url}" target="_blank">${randomRepo.name}</a><br>
            <p>Description:</p> ${randomRepo.description || 'No description available.'}<br>
            <p>Stars:</p> ${randomRepo.stargazers_count}`;
    
        }
    
        catch(error) {
            repoDisplay.textContent = 'Error fetching repositories. Please try again later.';
        }
    
    }

    else {
        repoDisplay.textContent = 'Please select a language';
    }

});

