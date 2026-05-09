<ol>
    <li>
        <h1 style="text-transform: capitalize;">header and main's opacity conflict</h1>
        <p>
            If <code>&lt;header&gt;</code> is written above the <code>&lt;main&gt;</code>,
            the opacity of <code>&lt;main&gt;</code> will affect the <code>&lt;nav&gt;</code> which has fixed display and
            display at the same area <code>&lt;main&gt;</code> despite <code>&lt;nav&gt;</code> is
            the child of <code>&lt;header&gt;</code> not <code>&lt;main&gt;</code>. Thus, the tag element
            is out of order from the display from screen.
        </p>
    </li>
    <li>
        <h1 style="text-transform: capitalize;">header and footer duplicate</h1>
        <p>
            All of these blog pages include homepage and 'about me' page has a same header
            and footer template, and yet I don't know how to render them automatically which could 
            lead to some pages are left unupdated when I modify header or footer e.g. adding hamburger menu.
        </p>
    </li>
</ol>