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
}
