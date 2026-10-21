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
                'published_at' => now()->subDays(5),
                'author' => 'Mohamed Aslam',
                'reading_time' => 7,
                'sort_order' => 1,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
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
                'published_at' => now()->subHours(1),
                'author' => 'Mohamed Aslam',
                'reading_time' => 12,
                'sort_order' => 3,
                'created_at' => now()->subHours(1),
                'updated_at' => now()->subHours(1),
            ],
            [
                'title' => 'The Silent Killer: Understanding and Fixing N+1 Queries in Laravel',
                'slug' => 'understanding-fixing-n-plus-one-queries-laravel',
                'excerpt' => 'The N+1 query problem is one of the most common performance bottlenecks in Laravel applications. Learn how to identify, debug, and eliminate it using Eager Loading.',
                'content' => $this->getNPlusOneArticle(),
                'featured_image' => 'img/blog/n_plus_one.png',
                'category' => 'Laravel',
                'tags' => json_encode(['Laravel', 'Performance', 'Eloquent', 'Optimization']),
                'is_published' => true,
                'published_at' => now(),
                'author' => 'Mohamed Aslam',
                'reading_time' => 8,
                'sort_order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Mastering SQL: Query Optimization & Indexing in Laravel',
                'slug' => 'mastering-sql-query-optimization-indexing-laravel',
                'excerpt' => 'Indexes are the difference between a high-performance application and a sluggish one. Learn how to architect your database for speed using indexes, types, and optimization strategies.',
                'content' => $this->getOptimizationArticle(),
                'featured_image' => 'img/blog/optimization.png',
                'category' => 'Database',
                'tags' => json_encode(['SQL', 'Indexing', 'Performance', 'Database Design']),
                'is_published' => true,
                'published_at' => now(),
                'author' => 'Mohamed Aslam',
                'reading_time' => 10,
                'sort_order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('blog_posts')->truncate();
        DB::table('blog_posts')->insert($posts);
    }

    private function getSqlArticle(): string
    {
        return <<<'HTML'
<h2>The Language That Powers the Modern Web</h2>
<p>In an era of shiny new frameworks and "Serverless" hype, SQL (Structured Query Language) remains the immutable bedrock of software engineering. Whether you are a Laravel developer writing Eloquent queries, a Python scientist analyzing sets, or a Product Manager pulling a report, SQL is the universal bridge between your application logic and your data.</p>
<p>As a Laravel engineer, I spend most of my time in the ORM (Object-Relational Mapper). But Eloquent is just a layer of "syntactic sugar" over raw SQL. <strong>Understanding the SQL generated by your ORM is the difference between a scalable product and a database that chokes under load.</strong></p>

<h2>What Exactly is a Relational Database?</h2>
<p>Think of a database not just as a "storage bucket," but as a highly sophisticated, multi-threaded filing system designed for extreme concurrency. Relational databases like MySQL and PostgreSQL organize data into strictly defined <strong>tables</strong>. These tables are connected through relationships using <strong>Primary Keys</strong> (a unique thumbprint for a row) and <strong>Foreign Keys</strong> (a reference to another row's thumbprint).</p>
<p>This structure ensures <strong>Referential Integrity</strong>. In a well-designed SQL database, it is impossible to have an "order" that belongs to a "user" who doesn't exist. The database itself enforces these rules, acting as the ultimate validator of your data's health.</p>

<h2>The 4 Pillars: Understanding ACID</h2>
<p>Why do we trust SQL for banking and commerce? It comes down to <strong>ACID compliance</strong>. This is a set of properties that guarantee database transactions are processed reliably:</p>
<ul>
    <li><strong>Atomicity:</strong> "All or nothing." If you are transferring $100 from Account A to Account B, either both balances update, or neither does. No halfway states.</li>
    <li><strong>Consistency:</strong> A transaction can only take the database from one valid state to another, maintaining all predefined rules (indices, triggers, etc.).</li>
    <li><strong>Isolation:</strong> Even if 1,000 users are hitting the database at once, their transactions are isolated from one another. It appears as if they are the only ones there.</li>
    <li><strong>Durability:</strong> Once a transaction is committed, it stays committed. Even if the server loses power a microsecond later, your data is safe on the disk.</li>
</ul>

<h2>SQL vs NoSQL — Beyond the Hype</h2>
<p>You have likely heard of NoSQL databases like MongoDB or Cassandra. They are fantastic for specific use cases: massive scale horizontally, or deeply nested, unpredictable data structures (like a social media feed). However, NoSQL often sacrifices ACID properties or complex relationship querying for that scale.</p>
<p>For 95% of web applications — and nearly every standard Laravel project — <strong>a Relational Database is the correct default</strong>. It provides the strongest guarantees for your most precious asset: your users' data.</p>

<h2>The "Big 6" Architecture</h2>
<p>Every SQL query follows a logical execution order, often referred to as the "Big 6." Mastering these clauses is the key to understanding how your database "thinks":</p>
<ol>
    <li><strong>SELECT:</strong> The "View" — Defining which columns the user sees.</li>
    <li><strong>FROM:</strong> The "Source" — Where's the data coming from? (Includes JOINs).</li>
    <li><strong>WHERE:</strong> The "Filter" — Which individual rows meet our criteria?</li>
    <li><strong>GROUP BY:</strong> The "Organizer" — How do we bucket these rows together?</li>
    <li><strong>HAVING:</strong> The "Aggregate Filter" — Filtering the buckets (e.g., "only buckets with > 10 items").</li>
    <li><strong>ORDER BY:</strong> The "Presentation" — How should we sort the final result?</li>
</ol>

<h2>Eloquent: A Double-Edged Sword</h2>
<p>Laravel's Eloquent is arguably the best ORM in the industry. It makes writing code a joy:</p>
<pre><code class="language-php">$orders = User::find(1)->orders()->where('total', '>', 100)->get();</code></pre>
<p>It looks like English. But under the hood, this triggers a <code>SELECT</code> with a <code>JOIN</code> or two separate queries. If you don't understand the underlying SQL, you might accidentally trigger an <strong>N+1 query problem</strong> (fetching every order one by one) or load 5,000 unnecessary models into memory, crashing your PHP process.</p>

<h2>Practical Roadmap for Mastery</h2>
<ol>
    <li><strong>Enable Query Logs:</strong> Use <code>DB::listen()</code> to watch every query in your local logs.</li>
    <li><strong>Learn EXPLAIN:</strong> Learn to read the execution plan. Is your query using an index, or is it scanning 1,000,000 rows?</li>
    <li><strong>Normalize Your Data:</strong> Don't store everything in one "god table." Lean on relationships and foreign keys.</li>
    <li><strong>Master Transactions:</strong> Use <code>DB::transaction()</code> for any operation that touches more than one row of important data.</li>
</ol>

<h2>Final Thought</h2>
<p>SQL is a career-long skill. Frameworks come and go, but the ability to talk to data, optimize performance at the source, and ensure data integrity is what separates junior developers from senior engineers. Stop relying purely on the "magic" of your ORM — start learning the language of the engine.</p>
HTML;
    }

    private function getAdvancedSqlArticle(): string
    {
        return <<<'HTML'
<h2>Stepping Beyond SELECT *</h2>
<p>In our first guide, we explored the "Big 6" clauses and why SQL is the bedrock of reliable data. But simple filtering is just the beginning. Real-world applications require you to combine disparate data, find patterns in noise, and calculate insights on the fly. This is where <strong>intermediate SQL mastery</strong> begins.</p>

<h2>The Power of the WHERE Clause: Advanced Filtering</h2>
<p>Most developers use <code>WHERE</code> for simple equality. But the true power of filtering lies in its more sophisticated operators:</p>
<ul>
    <li><strong>The IN Operator:</strong> Instead of chaining <code>OR</code> conditions, use <code>WHERE status IN ('active', 'pending', 'review')</code>. It is cleaner, faster, and more readable.</li>
    <li><strong>The LIKE / ILIKE Operator:</strong> Pattern matching with wildcards (<code>%</code>). <code>WHERE email LIKE '%@gmail.com'</code> finds all Gmail users. <em>Warning:</em> Leading wildcards (<code>%...</code>) prevent index usage and cause slow full-table scans!</li>
    <li><strong>Between and Nulls:</strong> <code>WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'</code>. Always remember that <code>NULL</code> is not a value — you must use <code>IS NULL</code> or <code>IS NOT NULL</code>.</li>
</ul>

<h2>Relational Joins: The "R" in RDBMS</h2>
<p>Normalization is the practice of splitting data into multiple tables to avoid redundancy. To see the "full picture," we must join them back together. Understanding the <em>logic</em> of joins is critical:</p>
<ul>
    <li><strong>INNER JOIN:</strong> The most common. Returns records only if there is a match in <strong>both</strong> tables. If a user has no orders, they vanish from the result.</li>
    <li><strong>LEFT JOIN:</strong> Returns 100% of the left table, with matching data from the right. If no match exists, the right side is <code>NULL</code>. This is perfect for finding "Users who have NOT placed an order."</li>
    <li><strong>SELF JOIN:</strong> Joining a table to itself. This is the only way to query hierarchical data in a single table, such as an <code>employees</code> table where some rows are "Managers" (referenced by a <code>manager_id</code> column).</li>
</ul>

<h3>JOIN vs UNION: Horizontal vs Vertical</h3>
<p>This is a common interview question that trips up many. Think of it this way:</p>
<ul>
    <li><strong>JOIN:</strong> Combines columns <strong>horizontally</strong> based on a relationship. Use this when you want to see a User's Name <em>next to</em> their Order Date.</li>
    <li><strong>UNION:</strong> Combines rows <strong>vertically</strong>. Use this when you want to stack two different query results into a single list (e.g., combining <code>customers</code> and <code>leads</code> into one "Contact" list). <em>Note:</em> <code>UNION</code> removes duplicates; use <code>UNION ALL</code> for better performance if duplicates are okay.</li>
</ul>

<h2>Aggregates: Summarizing Millions of Rows</h2>
<p>You should almost never fetch 10,000 rows just to count them in PHP. Let the database do it:</p>
<ul>
    <li><code>COUNT(*)</code> vs <code>COUNT(column)</code>: <code>COUNT(*)</code> counts every row. <code>COUNT(email)</code> counts only rows where the email is NOT NULL.</li>
    <li><code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code>, <code>MAX()</code>: Standard math at the source.</li>
</ul>

<h2>Grouping: The Foundation of Reporting</h2>
<p>Aggregates are nice, but they become powerful with <code>GROUP BY</code>. "How many sales did we make?" is okay. "How many sales did we make <strong>per category, per month</strong>?" is a business insight.</p>
<pre><code class="language-php">SELECT 
    category, 
    MONTH(order_date) as sales_month, 
    SUM(total) as revenue
FROM orders
GROUP BY category, sales_month
ORDER BY revenue DESC;</code></pre>

<h3>Filtering Aggregates with HAVING</h3>
<p>Remember: <code>WHERE</code> happens <strong>before</strong> the data is grouped. <code>HAVING</code> happens <strong>after</strong>. If you want to find "Categories that generated more than $50,000 in revenue," you must use <code>HAVING sum(total) > 50000</code>.</p>

<h2>Conclusion</h2>
<p>Mastering these intermediate concepts turns you from a developer who "gets data" into one who "architects insights." By pushing logic into the database via Joins and Grouping, you reduce the memory footprint of your application and ensure your code scales gracefully with your data.</p>
HTML;
    }

    private function getBeyondBig6Article(): string
    {
        return <<<'HTML'
<h2>When the Fundamentals Aren't Enough</h2>
<p>We have already mastered the "Big 6" SQL clauses and how to traverse relational joins. For most day-to-day CRUD operations, that is more than enough. But eventually, you will face a reporting requirement that feels impossible: "Give me the month-over-month growth," or "Show me the top 3 products in <em>each</em> category."</p>
<p>To solve these, we must step into the world of <strong>Advanced Analytics</strong>. These tools don't just fetch data; they transform it into intelligence.</p>

<h2>Beyond Nulls: The Magic of COALESCE</h2>
<p>Reporting on data with <code>NULL</code> values often leads to ugly results or broken calculations. <code>COALESCE</code> is a simple but vital function that returns the first non-null value in a list.</p>
<pre><code class="language-sql">SELECT 
    name, 
    COALESCE(phone, 'No Phone Provided') as contact_info 
FROM users;</code></pre>
<p>This is much cleaner than doing <code>$user->phone ?? 'No Phone'</code> in a Blade template or a React component. <strong>The closer you handle data formatting to the source, the faster your application remains.</strong></p>

<h2>Advanced Functions: YEAR, FLOOR, and REGEXP</h2>
<p>Your database is a calculator and a string processor. Use it:</p>
<ul>
    <li><strong>Date Logic:</strong> <code>WHERE YEAR(created_at) = 2024</code>. Instead of pulling everything and filtering in Carbon, keep the heavy lifting on the DB.</li>
    <li><strong>Math:</strong> <code>FLOOR()</code>, <code>CEIL()</code>, and <code>ROUND()</code>. Perfect for currency and statistics.</li>
    <li><strong>Pattern Matching:</strong> <code>REGEXP</code>. While <code>LIKE</code> is simple, <code>WHERE email REGEXP '^[a-z]+@gmail\.com$'</code> gives you full regex power directly in the query.</li>
</ul>

<h2>Subqueries vs. CTEs (Common Table Expressions)</h2>
<p>A Subquery is a query inside another query. They work, but they are hard to read (inside-out). A **CTE** (using the <code>WITH</code> clause) allows you to name a temporary result set and use it like a table.</p>
<pre><code class="language-sql">WITH RegionalSales AS (
    SELECT region, SUM(total) as revenue
    FROM orders
    GROUP BY region
)
SELECT * FROM RegionalSales WHERE revenue > 100000;</code></pre>
<p>CTEs make your SQL "Top-Down" readable. It's like extracting a variable in PHP for better clarity.</p>

<h2>The Analytical Holy Grail: Window Functions</h2>
<p>Window functions allow you to perform calculations across rows <strong>without collapsing them into a single result</strong> (like GROUP BY does). The secret is the <code>OVER()</code> clause.</p>

<h3>Understanding the OVER() Clause</h3>
<p>The <code>OVER()</code> clause defines the "window" of data. <code>PARTITION BY</code> is like "Group By for this calculation only," while <code>ORDER BY</code> inside the clause defines the sequence for things like rankings.</p>

<h3>Ranking with ROW_NUMBER() and RANK()</h3>
<pre><code class="language-sql">SELECT 
    name, 
    score, 
    RANK() OVER (ORDER BY score DESC) as leaderboard_position
FROM players;</code></pre>

<h3>Time-Travel with LEAD() and LAG()</h3>
<p>This is how you calculate growth. <code>LAG()</code> looks at the previous row's value, and <code>LEAD()</code> looks at the next.</p>
<pre><code class="language-sql">SELECT 
    month, 
    revenue,
    revenue - LAG(revenue) OVER (ORDER BY month) as revenue_growth
FROM monthly_stats;</code></pre>
<p>This single query replaces what would otherwise be a complex, memory-intensive loop in your application code.</p>

<h2>Conclusion</h2>
<p>Analytical SQL is about efficiency and intelligence. Functions like <code>LAG</code>, <code>CTE</code>, and <code>COALESCE</code> allow you to build complex dashboards and reports that load in milliseconds rather than seconds. As you grow as a developer, these tools become your strategic advantage for data-heavy applications.</p>
HTML;
    }

    private function getNPlusOneArticle(): string
    {
        return <<<'HTML'
<h2>What is the N+1 Query Problem?</h2>
<p>In the world of ORMs (Object-Relational Mappers) like Eloquent, the N+1 query problem is a performance bottleneck that occurs when your application executes one query to fetch a parent record (or multiple records) and then executes <strong>another query for each parent record</strong> to fetch its related children.</p>
<p>If you have 100 blog posts and you want to display their authors, a poorly written loop will execute 1 query for the posts and 100 individual queries for the authors. That is 101 queries for a simple list. This is the "Silent Killer" — it feels fast on your local machine with 5 records, but it destroys production performance when your data scales.</p>

<h2>Advanced Detection</h2>
<p>Detection is the first step to recovery. Most developers use **Laravel Debugbar**, but you can also detect these bottlenecks programmatically in your <code>AppServiceProvider.php</code>:</p>
<pre><code class="language-php">use Illuminate\Database\Eloquent\Model;

public function boot()
{
    // Throws an exception if an N+1 query is triggered in non-production
    Model::preventLazyLoading(! app()->isProduction());
    
    // Total enforcement: prevents lazy loading, prevents silent attribute discarding, 
    // and prevents accessing missing attributes.
    Model::shouldBeStrict(! app()->isProduction());
}</code></pre>

<h2>The Solution: Eager Loading</h2>
<p>The <code>with()</code> method is your primary weapon. It tells Eloquent to fetch the relationships in a single `IN` query right after fetching the parents.</p>

<h3>1. Nested Eager Loading</h3>
<p>Don't stop at one level. You can load deeply nested relationships in a single go:</p>
<pre><code class="language-php">$posts = Post::with('author.profile.city')->get();</code></pre>

<h3>2. Eager Loading Specific Columns</h3>
<p>Fetching entire rows (<code>SELECT *</code>) into memory is wasteful if you only need the name. Use the "Colon Syntax" to restrict columns:</p>
<pre><code class="language-php">$posts = Post::with('author:id,name,avatar')->get();</code></pre>
<p><strong>Critical Rule:</strong> You must always include the <code>id</code> (or the foreign key column) so Eloquent can map the relationship correctly!</p>

<h3>3. Aggregates Without Models: withCount()</h3>
<p>If you only need to know <em>how many</em> comments a post has, don't load the relationship. Use <code>withCount()</code>:</p>
<pre><code class="language-php">$posts = Post::withCount('comments')->get();
// Each $post will have a 'comments_count' attribute.</code></pre>
<p>This runs a sub-select in SQL, which is dramatically faster than loading hundreds of Comment objects just to count them in PHP.</p>

<h3>4. Conditional and Lazy Eager Loading</h3>
<p>Sometimes you only need to load a relationship if a certain condition is met. Use <code>load()</code> after the model has been retrieved:</p>
<pre><code class="language-php">$user = User::first();

if ($showHistory) {
    $user->load('loginHistory');
}</code></pre>

<h2>Conclusion</h2>
<p>Eager Loading is not just about reducing query counts; it's about efficient memory management and predictable application performance. By mastering <code>with()</code>, <code>withCount()</code>, and enabling <code>shouldBeStrict()</code>, you ensure your Laravel applications stay lightning-fast as they scale from 100 to 1,000,000 users.</p>
HTML;
    }

    private function getOptimizationArticle(): string
    {
        return <<<'HTML'
<h2>Why Optimization Matters</h2>
<p>In the early stages of a product, every query feels fast because your tables are small. But as your data grows from 10,000 to 1,000,000 rows, "deceptively simple" queries become major bottlenecks. Optimizing SQL isn't just about "cleaning up code" — it is about understanding the mechanical sympathy of the database engine.</p>

<h2>The Anatomy of an Index: B-Trees</h2>
<p>Most relational databases use **B-Tree (Balanced Tree)** structures for their indexes. Think of this as a sorted, multi-level map. Instead of scanning every row in a table (a "Full Table Scan"), the database traverses the tree, cutting the search space in half at every level. This turns an <code>O(N)</code> operation into an <code>O(log N)</code> operation, which is the difference between seconds and milliseconds.</p>

<h2>Types of Indexes</h2>
<ul>
    <li><strong>Primary/Unique Index:</strong> Not only speeds up lookups but prevents data duplication at the storage level.</li>
    <li><strong>Composite Index:</strong> An index on multiple columns (e.g., <code>user_id</code> and <code>status</code>). <strong>The Rule of the Leftmost Prefix:</strong> An index on <code>(A, B)</code> can optimize queries on <code>A</code> or <code>(A and B)</code>, but it <em>cannot</em> optimize a query on <code>B</code> alone.</li>
    <li><strong>Covering Index:</strong> This is the "Holy Grail." If your index contains <em>all</em> the columns requested in the <code>SELECT</code>, the database never even has to touch the actual table. It reads everything directly from the index in memory.</li>
</ul>

<h2>The Concept of Selectivity</h2>
<p>An index is only useful if it helps the database narrow down the results. <strong>High Selectivity</strong> means a column has many unique values (like <code>email</code>). <strong>Low Selectivity</strong> means many rows share the same value (like <code>gender</code> or <code>is_active</code>). Adding an index to a low-selectivity column is often useless, as the database engine may decide a full table scan is actually faster.</p>

<h2>Effective Query Auditing: EXPLAIN ANALYZE</h2>
<p>Never guess; always measure. By prefixing your query with <code>EXPLAIN ANALYZE</code>, you get a detailed breakdown of the execution path:</p>
<ul>
    <li><strong>Cost:</strong> A relative number representing the "effort" required.</li>
    <li><strong>Rows Scanned:</strong> How many rows the DB had to look at to find your answer. If this is high, your index is failing.</li>
    <li><strong>Using Filesort:</strong> A warning sign. This means your <code>ORDER BY</code> is happening in memory because no appropriate index was found.</li>
</ul>

<h2>Advanced Laravel Tips</h2>
<ol>
    <li><strong>Avoid SELECT *:</strong> Fetching columns you don't use increases memory pressure and prevents "Covering Index" optimizations.</li>
    <li><strong>Index Your Foreign Keys:</strong> Every column used in a <code>JOIN</code> or <code>belongsTo</code> relationship should almost certainly be indexed.</li>
    <li><strong>Fulltext Search:</strong> <code>LIKE '%keyword%'</code> is extremely slow. For text-heavy datasets, use MySQL/PostgreSQL <strong>Fulltext Indexes</strong> or dedicated tools like Meilisearch.</li>
</ol>

<h2>Conclusion</h2>
<p>Database optimization is a continuous process of auditing and refining. By architecting your database with B-Trees, selectivity, and composite indexing in mind, you ensure that your Laravel application remains lightning-fast regardless of how much data you throw at it.</p>
HTML;
    }
}
