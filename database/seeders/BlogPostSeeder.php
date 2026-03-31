<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Why Every Developer Should Learn SQL',
                'slug' => 'why-every-developer-should-learn-sql',
                'excerpt' => 'SQL is everywhere. Whether you are a Laravel developer writing Eloquent queries or a data analyst pulling reports, understanding what happens under the hood will make you significantly better at your job.',
                'content' => $this->getSqlArticle(),
                'featured_image' => 'img/blog/sql_fundamentals.png',
                'category' => 'Database',
                'tags' => json_encode(['SQL', 'MySQL', 'Laravel', 'Database', 'Backend']),
                'is_published' => true,
                'published_at' => now(),
                'author' => 'Mohamed Aslam',
                'reading_time' => 7,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Beyond Basic SQL: Mastering Joins, Grouping, and Aggregations',
                'slug' => 'mastering-sql-joins-grouping-aggregations',
                'excerpt' => 'When Eloquent isn\'t enough, you need raw SQL power. Let\'s dive into filtering data effectively, grouping records, and the magic of relational joins.',
                'content' => $this->getAdvancedSqlArticle(),
                'featured_image' => 'img/blog/advanced_sql.png',
                'category' => 'Database',
                'tags' => json_encode(['SQL', 'MySQL', 'Data Analytics', 'Advanced']),
                'is_published' => true,
                'published_at' => now()->subDays(2),
                'author' => 'Mohamed Aslam',
                'reading_time' => 10,
                'sort_order' => 2,
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'title' => 'Beyond the Big 6: Unions, CTEs, and Window Functions',
                'slug' => 'beyond-the-big-6-unions-ctes-window-functions',
                'excerpt' => 'When basic joins and groupings hit their limit, advanced SQL techniques like CTEs, Window Functions, and CASE statements are your strategic advantage for complex data reporting.',
                'content' => $this->getBeyondBig6Article(),
                'featured_image' => 'img/blog/beyond_big_6.png',
                'category' => 'Database',
                'tags' => json_encode(['SQL', 'Advanced', 'Data Analytics']),
                'is_published' => true,
                'published_at' => now()->subHours(12),
                'author' => 'Mohamed Aslam',
                'reading_time' => 12,
                'sort_order' => 3,
                'created_at' => now()->subHours(12),
                'updated_at' => now()->subHours(12),
            ],
        ];

        DB::table('blog_posts')->truncate();
        DB::table('blog_posts')->insert($posts);
    }

    private function getSqlArticle(): string
    {
        return <<<'HTML'
<h2>The Language That Powers Almost Everything</h2>
<p>If you have ever used a web application, there is a very high chance SQL was involved somewhere in the background. SQL (Structured Query Language) is the universal language for talking to relational databases, and it has been around for decades — yet it remains one of the most sought-after skills in the tech industry.</p>
<p>As a Laravel developer, I work with databases every single day. Eloquent ORM abstracts a lot of the complexity away, but <strong>understanding the SQL it generates is the difference between a query that takes 50ms and one that takes 5 seconds</strong>.</p>

<h2>What Even Is a Database?</h2>
<p>At its core, a database is simply a structured place to store and retrieve data. Think of it like a well-organized filing cabinet — except it can hold millions of records and find what you need in milliseconds.</p>
<p>Relational databases (like MySQL, PostgreSQL, and SQLite) organize data into <strong>tables</strong> that are connected through relationships. Each table has rows (records) and columns (fields). A <strong>primary key</strong> uniquely identifies each row, while <strong>foreign keys</strong> create connections between tables.</p>
<p>This is exactly the foundation that Laravel migrations and Eloquent relationships build on. When you write <code>$table->foreignId('user_id')->constrained()</code> in a migration, you are defining a relational link in SQL.</p>

<h2>SQL vs NoSQL — Picking the Right Tool</h2>
<p>Not every database is relational. NoSQL databases (like MongoDB or Redis) store data in more flexible formats — documents, key-value pairs, or graphs. They shine when your data does not fit neatly into rows and columns.</p>
<p>However, for most web applications and certainly for the typical Laravel project, <strong>a relational database with SQL is the right choice</strong>. The structure, referential integrity, and powerful querying capabilities are hard to beat for transactional workloads.</p>

<h2>The Big 6 — SQL Clauses You Must Know</h2>
<p>Every SQL query follows a specific order. I call these the "Big 6" clauses, and mastering them covers about 80% of what you will ever need:</p>
<ol>
<li><strong>SELECT</strong> — Choose which columns you want to retrieve</li>
<li><strong>FROM</strong> — Specify which table to query</li>
<li><strong>WHERE</strong> — Filter rows based on conditions</li>
<li><strong>GROUP BY</strong> — Aggregate rows that share common values</li>
<li><strong>HAVING</strong> — Filter grouped results (like WHERE, but for aggregates)</li>
<li><strong>ORDER BY</strong> — Sort the results</li>
</ol>
<p>In Laravel Eloquent, these map directly:</p>
<pre><code>User::select('department', DB::raw('count(*) as total'))
    ->where('active', true)
    ->groupBy('department')
    ->having('total', '>', 5)
    ->orderBy('total', 'desc')
    ->get();</code></pre>
<p>Understanding the SQL behind that Eloquent chain helps you debug performance issues and write optimized queries when the ORM is not enough.</p>

<h2>Why Spreadsheets Fall Short</h2>
<p>Many people start managing data in spreadsheets. It works until it does not. Here is where SQL databases win:</p>
<ul>
<li><strong>Scale</strong> — Spreadsheets struggle past a few thousand rows. SQL handles millions without breaking a sweat.</li>
<li><strong>Permissions</strong> — You can control who reads, writes, or modifies data at a granular level.</li>
<li><strong>Integrity</strong> — Foreign keys and constraints ensure your data stays consistent. No more broken references.</li>
<li><strong>Concurrency</strong> — Multiple users can read and write simultaneously without conflicts.</li>
</ul>

<h2>Practical Advice for Laravel Developers</h2>
<p>Here is what I recommend to every developer working with Laravel:</p>
<ul>
<li><strong>Learn to read raw SQL.</strong> Use <code>DB::enableQueryLog()</code> or Laravel Debugbar to see the actual queries Eloquent generates. You will be surprised how often an N+1 problem is hiding in your code.</li>
<li><strong>Master indexes.</strong> Adding an index to a frequently queried column can turn a 3-second page load into a 30ms one.</li>
<li><strong>Practice writing raw queries.</strong> Tools like MySQL Workbench or even <code>php artisan tinker</code> are great for experimenting.</li>
<li><strong>Understand joins.</strong> Eloquent's <code>with()</code> and <code>load()</code> are powered by SQL joins and subqueries. Knowing when to use <code>join()</code> directly can save significant execution time.</li>
</ul>

<h2>The Bottom Line</h2>
<p>SQL is not going anywhere. Regardless of which framework or language you work with, data is at the heart of every application. The developers who understand how their data is stored, queried, and optimized are the ones who build applications that scale.</p>
<p>If you have been relying purely on ORMs without understanding the SQL underneath, take a weekend and learn the fundamentals. Your future self — and your application's performance — will thank you.</p>
HTML;
    }

    private function getAdvancedSqlArticle(): string
    {
        return <<<'HTML'
<h2>Stepping Beyond SELECT *</h2>
<p>In my previous post, we touched on the foundational concepts of SQL and how they map directly to the tools we use in Laravel. But what happens when your data requirements become more complex? When a simple <code>SELECT * FROM users</code> is no longer sufficient? This is where the true power of SQL filtering, aggregating, and joining comes into play.</p>
<p>Around 40 minutes into any quality SQL crash course, you will typically transition from basic table creation into the deeply powerful mechanisms of data retrieval. Let us explore these intermediate concepts that every developer must master.</p>

<h2>The Power of the WHERE Clause</h2>
<p>Filtering data is arguably the most common operation in a database. The <code>WHERE</code> clause allows you to precisely target the records you need.</p>
<p>But the true power of <code>WHERE</code> lies in its operators. Beyond simple equality (<code>=</code>), you have a vast array of logical tools at your disposal:</p>
<ul>
<li><strong>Comparison Operators:</strong> <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, <code>&lt;&gt;</code> (or <code>!=</code>).</li>
<li><strong>Logical Operators:</strong> Combine multiple conditions using <code>AND</code> and <code>OR</code>. Remember that <code>AND</code> takes precedence over <code>OR</code> unless you use parentheses.</li>
<li><strong>The IN Operator:</strong> A lifesaver when checking against a list of values. <code>WHERE status IN ('active', 'pending')</code> is much cleaner than chaining OR conditions.</li>
<li><strong>The LIKE Operator:</strong> For pattern matching. Using percentage signs as wildcards (e.g., <code>WHERE email LIKE '%@gmail.com'</code>) allows for fuzzy searches, though at a performance cost if not indexed correctly.</li>
</ul>

<h2>Aggregate Functions: Turning Rows into Insights</h2>
<p>Often, you do not want to see individual rows; you want to see summaries. SQL provides aggregate functions specifically for this:</p>
<ul>
<li><code>COUNT()</code>: How many rows exist?</li>
<li><code>SUM()</code>: What is the total value of a numeric column?</li>
<li><code>AVG()</code>: What is the average value?</li>
<li><code>MIN()</code> / <code>MAX()</code>: What are the smallest or largest values?</li>
</ul>
<p>In Eloquent, these map to their exact namesakes: <code>$total = Order::sum('amount');</code>. Behind the scenes, the database calculates this almost instantaneously, saving your application from fetching thousands of rows just to tally them up in PHP.</p>

<h2>Grouping Data to Reveal Patterns</h2>
<p>Aggregate functions become exponentially more powerful when combined with the <code>GROUP BY</code> clause. Instead of counting all users, what if you want to count users <em>by department</em>?</p>
<pre><code>SELECT department, COUNT(*) AS total_employees 
FROM employees 
GROUP BY department;</code></pre>
<p>This single query replaces what would otherwise involve fetching all records and running an array reduce operation in your application code. <strong>Always let the database do the heavy lifting when it comes to data reduction.</strong></p>

<h3>Filtering Grouped Data: The HAVING Clause</h3>
<p>A common gotcha: you cannot use a <code>WHERE</code> clause to filter aggregate results. The <code>WHERE</code> clause filters rows <em>before</em> they are grouped. If you want to filter <em>after</em> grouping (e.g., "show me only departments with more than 10 employees"), you use the <code>HAVING</code> clause.</p>

<h2>Relationships and Joins</h2>
<p>Relational databases derive their name from relationships. Data is normalized (split across multiple tables) to reduce redundancy. To piece it back together, we use <strong>JOINs</strong>.</p>
<p>Mastering the different types of joins is critical:</p>
<ul>
<li><strong>INNER JOIN:</strong> Returns rows where there is a match in <strong>both</strong> tables. (e.g., Users who have placed an Order).</li>
<li><strong>LEFT JOIN:</strong> Returns <strong>all</strong> rows from the left table, and matched rows from the right table. (e.g., All users, including those who haven't placed an order—the order columns will just be NULL).</li>
<li><strong>RIGHT JOIN:</strong> The inverse of the Left Join. (Less commonly used, but conceptually identical).</li>
<li><strong>FULL OUTER JOIN:</strong> Returns rows when there is a match in <em>either</em> the left or right table.</li>
</ul>

<h2>Translating to Eloquent</h2>
<p>As Laravel developers, we rarely write raw JOINs thanks to Eloquent relationships (<code>hasMany</code>, <code>belongsTo</code>). When we use <code>User::with('orders')->get()</code>, Laravel is actually running two separate queries and joining them in memory to avoid the "N+1 query problem."</p>
<p>However, when you need performance-critical reports, dropping down to Query Builder joins can drastically reduce memory usage compared to hydrating hundreds of Eloquent models.</p>

<h2>Conclusion</h2>
<p>While ORMs speed up development, the underlying SQL is the immutable engine of your application. When you intimately understand how Joins, Groupings, and Aggregates function natively, you become capable of architecting much faster, more reliable web applications.</p>
HTML;
    }

    private function getBeyondBig6Article(): string
    {
        return <<<'HTML'
<h2>When the Fundamentals Aren't Enough</h2>
<p>We've already covered the foundational "Big 6" SQL clauses (<code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>) and how to navigate relational joins. For 80% of web development, that is all you will ever need.</p>
<p>But then comes the other 20%. You will eventually face a reporting requirement that feels impossible using standard Eloquent methods or even basic SQL grouping. You need to rank items, stack disconnected tables together, or execute deeply nested logic within a single query. Welcome to intermediate/advanced SQL.</p>

<h2>Stacking Results with UNIONs</h2>
<p>While a <code>JOIN</code> combines columns from different tables horizontally, a <code>UNION</code> combines rows vertically.</p>
<p>Imagine you have an <code>active_users</code> table and an <code>archived_users</code> table. If you want a unified list of all email addresses across both, a <code>JOIN</code> won’t help because the data doesn't share a relational bond — it shares a <em>structural</em> bond.</p>
<pre><code>SELECT email, 'active' as status FROM active_users
UNION
SELECT email, 'archived' as status FROM archived_users;</code></pre>
<p><strong>Note:</strong> <code>UNION</code> automatically removes duplicate rows. If you want absolutely every row, including duplicates, use <code>UNION ALL</code>, which is also significantly faster because the database skips the deduplication step.</p>

<h2>Conditional Logic: The CASE Statement</h2>
<p>Think of the <code>CASE</code> statement as an <code>if/else</code> or <code>switch</code> block running directly inside your database query. Instead of pulling raw data and running conditionally formatted maps in PHP, you can format the data at the source.</p>
<pre><code>SELECT 
    product_name,
    stock,
    CASE 
        WHEN stock > 100 THEN 'In Stock'
        WHEN stock > 0 THEN 'Low Stock'
        ELSE 'Out of Stock'
    END as availability_status
FROM inventory;</code></pre>
<p>As Laravel developers, combining <code>CASE</code> statements with <code>DB::raw()</code> allows you to create incredibly powerful custom accessors straight from the database, completely bypassing complex PHP logic.</p>

<h2>Subqueries vs. CTEs (Common Table Expressions)</h2>
<p>Every SQL developer eventually needs to query the result of another query. Traditionally, this is done with <strong>Subqueries</strong>—nesting a query inside another `FROM` or `WHERE` clause.</p>
<pre><code>SELECT * FROM (
    SELECT user_id, SUM(total) as lifetime_value
    FROM orders GROUP BY user_id
) as customer_totals
WHERE lifetime_value > 1000;</code></pre>
<p>While subqueries work, they make your code difficult to read because you have to read them from the inside-out. The modern solution is a <strong>CTE (Common Table Expression)</strong> using the `WITH` clause. A CTE allows you to create temporary, named result sets that exist only for the duration of a single query, making your code readable from top to bottom.</p>
<pre><code>WITH HighValueCustomers AS (
    SELECT user_id, SUM(total) as lifetime_value
    FROM orders
    GROUP BY user_id
    HAVING lifetime_value > 1000
)

SELECT users.name, users.email, hvc.lifetime_value
FROM users
JOIN HighValueCustomers hvc ON users.id = hvc.user_id;</code></pre>
<p>Not only are CTEs easier to read and debug, but modern databases also optimize them incredibly well.</p>

<h2>The Holy Grail: Window Functions</h2>
<p>Window functions are arguably the most powerful feature in modern SQL. They allow you to perform calculations across a set of rows (a "window") <strong>without grouping them into a single output row</strong>. This solves a massive problem: calculating aggregates while still keeping the detail rows.</p>
<p>For example, if you want to show a list of employees, their salary, and the average salary of their specific department side-by-side:</p>
<pre><code>SELECT 
    name, 
    department, 
    salary,
    AVG(salary) OVER (PARTITION BY department) as dept_avg_salary
FROM employees;</code></pre>
<p>Because there is no <code>GROUP BY</code> clause, all rows are returned, but the <code>OVER (PARTITION BY)</code> clause calculates the average strictly within that department's "window."</p>

<h3>Ranking and Peeking with Window Functions</h3>
<p>Window functions are also the only clean way to create leaderboards using functions like <code>ROW_NUMBER()</code> or <code>RANK()</code>. But another massive feature is the <code>LAG()</code> function, which allows you to look at data from the <em>previous</em> row without writing a complex self-join.</p>
<pre><code>SELECT 
    name, 
    score,
    RANK() OVER (ORDER BY score DESC) as player_rank,
    score - LAG(score) OVER (ORDER BY score DESC) as points_behind_next_player
FROM leaderboards;</code></pre>

<h2>Essential Functions (YEAR, FLOOR, REGEXP)</h2>
<p>Beyond standard operators, databases ship with incredibly powerful functions built right in:</p>
<ul>
<li><strong><code>YEAR()</code>:</strong> Extracts the year from a date column. Instead of fetching the timestamp and formatting in Carbon, use <code>WHERE YEAR(created_at) = 2024</code>.</li>
<li><strong><code>FLOOR()</code> & <code>CEIL()</code>:</strong> Perfect for rounding numeric aggregates down or up directly in your query.</li>
<li><strong><code>REGEXP</code>:</strong> SQL isn't limited to <code>LIKE '%...%'</code>. Standard SQL engines support full Regular Expressions, allowing you to filter data dynamically (e.g., <code>WHERE email REGEXP '^[a-z]+@gmail\.com$'</code>).</li>
</ul>

<h2>Timing Queries: Does Performance Matter?</h2>
<p>As you add CTEs and Window Functions, performance becomes critical. How do you know if your query is fast? Prefix any query with <code>EXPLAIN ANALYZE</code> (in MySQL/PostgreSQL). This powerful command doesn't just run the query—it returns a detailed execution plan showing exactly where the database spent its time and whether it used indexes.</p>

<h2>Bringing it Back to Laravel</h2>
<p>Laravel's query builder natively supports CTEs, and you can inject Window functions seamlessly using raw expressions. However, knowing <em>when</em> to use them is the hardest part. If you ever find yourself iterating over thousands of loaded Eloquent models just to rank them, calculate running totals, or group them logically in memory — stop. Push that heavy lifting back to the database, where it belongs.</p>
HTML;
    }
}
