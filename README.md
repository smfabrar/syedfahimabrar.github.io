<a href="https://jekyll-themes.com">
<img src="https://img.shields.io/badge/featured%20on-JT-red.svg" height="20" alt="Jekyll Themes Shield" >
</a>

# Orbit
> This theme is designed by Xiaoying Riley at [3rd Wave Media](http://themes.3rdwavemedia.com/).
> Visit [her website](http://themes.3rdwavemedia.com/) for more themes.

I have made this into a Jekyll Theme. Checkout the live demo [here](https://online-cv.webjeda.com).

<table>
  <tr>
    <th>Desktop</th>
    <th>Mobile</th>
  </tr>
  <tr>
    <td>
        <img src="https://online-cv.webjeda.com/assets/images/desktop.png?raw=true" width="600"/>
    </td>
    <td>
        <img src="https://online-cv.webjeda.com/assets/images/mobile.png?raw=true" width="250"/>
    </td>
  </tr>
</table>

## Installation

* [Fork](https://github.com/sharu725/online-cv/fork) the repository;
* Go to settings and set master branch as Github Pages source;
* Your new site should be ready at `https://<username>.github.io/online-cv/`;
* Printable version of the site can be found at `https://<username>.github.io/online-cv/print`. Use a third party link https://pdflayer.com/, https://www.web2pdfconvert.com/ etc to get the printable PDF.

Change all the details from one place: `_data/data.yml`.

### To preview/edit locally with docker

```sh
docker-compose up
```

*docker-compose.yml* file is used to create a container that is reachable under <http://localhost:4000>.
Changes *_data/data.yml* will be visible after a while.

### Local machine

* Get the repo into your machine 

```bash
git clone https://github.com/sharu725/online-cv.git
```

* Install required ruby gems

```bash
bundle install
```

* Serve the site locally

```bash
bundle exec jekyll serve
```

* Navigate to `http://localhost:4000`


## Portfolio analytics (Microsoft Clarity)

1. Create a project for `https://fahimabrar.com` at [Microsoft Clarity](https://clarity.microsoft.com/).
2. Copy the project ID from **Settings → Setup** (the value after `/tag/` in the tracking snippet) into `clarity_project_id` in `_config.yml`. The ID is public; no API secret is needed.
3. In Clarity, keep consent mode and sensitive content masking enabled, and leave advertising integrations off. The site always sends denied analytics and advertising storage signals.
4. Deploy the site through GitHub Pages. For a local production preview, use `JEKYLL_ENV=production bundle exec jekyll serve`. Development builds and builds with an empty project ID do not load analytics.
5. Visit the deployed portfolio and check Clarity’s Dashboard and Recordings for the visit. A browser content blocker or Clarity’s regional restrictions may limit collection.

The site loads Clarity in **cookieless mode**, with no banner, warning, preferences button, or privacy page. It queues `consentv2` with both `analytics_Storage` and `ad_Storage` set to `denied` before requesting Microsoft's script. It does not read or save consent preferences, including any opt-in saved by the previous banner. Existing Clarity cookies are handled by Clarity's denied-consent behavior.

Cookieless mode keeps page interactions and custom engagement events where supported, but it cannot reliably recognize returning visitors or connect page views. Reloads can inflate unique visitor and session counts; attribution, duration, and intent reports can be less accurate. See [Microsoft's limitations](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-without-cookie-consent).

### Find what interests visitors

Use **Filters → Custom tags** alongside **Smart events** to find relevant session recordings:

| Event or tag | Meaning |
| --- | --- |
| `summary_engaged`, `experience_engaged`, `education_engaged`, `certifications_engaged`, `projects_engaged`, `open_source_engaged`, `publications_engaged`, `skills_engaged` | The section intersected the viewport for at least two continuous seconds while the tab was visible. This indicates exposure, not proof it was read. |
| `portfolio_item_engaged` | An individual project, experience, certification, publication, open source contribution, or skill group met the same visibility threshold. |
| `viewed_section`, `viewed_item` | The section and item names associated with engagement. Each is a session tag: a session can accumulate multiple values. |
| `projects_link_click`, `publications_link_click`, `open_source_link_click`, `experience_link_click`, `education_link_click`, `certifications_link_click`, `skills_link_click`, `summary_link_click` | A link was clicked inside that section. Events occur only where links exist. |
| `clicked_section`, `clicked_item` | Context for clicks; use event details in the recording to inspect the precise sequence. Session tag combinations do not prove which action involved which item. |
| `resume_click`, `email_click`, `phone_click`, `booking_open`, `linkedin_click`, `github_profile_click`, `other_site_click` | A résumé, contact, social profile, or linked site was opened. A résumé click does not confirm a download; booking and email clicks do not confirm completion. |
| `outbound_link_click`, `outbound_host` | An external web link was clicked; only its hostname is added as a custom tag. |

For example, filter `viewed_section = projects` and `booking_open` to review visits that included project engagement and an attempt to open your calendar. Use heatmaps for click and scroll patterns and recordings for the order of interactions. Clarity provides pseudonymous visitor/session insights, not real names or employers. The site sends no custom visitor identifiers, form values, email addresses, phone numbers, or link query parameters as custom tags. The external booking popup’s contents and booking completion are not tracked.

The theme’s retired Universal Analytics setting is disabled. Existing Google Analytics code remains available only if `analytics` is deliberately configured.

## Skins

There are 6 color schemes available:

| Blue | Turquoise | Green |
|---------|---------|---------|
| <img src="https://online-cv.webjeda.com/assets/images/blue.jpg" width="300"/> | <img src="https://online-cv.webjeda.com/assets/images/turquoise.jpg" width="300"/> | <img src="https://online-cv.webjeda.com/assets/images/green.jpg" width="300"/> |

| Berry | Orange | Ceramic |
|---------|---------|---------|
| <img src="https://online-cv.webjeda.com/assets/images/berry.jpg" width="300"/> | <img src="https://online-cv.webjeda.com/assets/images/orange.jpg" width="300"/> | <img src="https://online-cv.webjeda.com/assets/images/ceramic.jpg" width="300"/> |

## Credits

Thanks to [Nelson Estevão](https://github.com/nelsonmestevao) for all the [contributions](https://github.com/sharu725/online-cv/commits?author=nelsonmestevao).

Thanks to [t-h-e(sfrost)](https://github.com/t-h-e) for all the [contributions](https://github.com/sharu725/online-cv/commits?author=t-h-e).

Check out for more themes: [**Jekyll Themes**](http://jekyll-themes.com).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=sharu725/online-cv&type=Date)](https://star-history.com/#sharu725/online-cv&Date)

