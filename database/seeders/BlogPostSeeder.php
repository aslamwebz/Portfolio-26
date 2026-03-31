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
<p>Relational databases like MySQL and PostgreSQL organize data into strictly defined <strong>tables</strong>. These tables are connected through relationships using <strong>Primary Keys</strong> (a unique thumbprint for a row) and <strong>Foreign Keys</strong> (a reference to another row's thumbprint).</p>
<p>This structure ensures <strong>Referential Integrity</strong>. In a well-designed SQL database, it is impossible to have an "order" that belongs to a "user" who doesn't exist. The database itself enforces these rules, acting as the ultimate validator of your data's health.</p>

<h3>Example: Defining Relational Integrity</h3>
<p>In a Laravel migration, this integrity is defined at the engine level:</p>
<pre><code class="language-php" data-filename="create_orders_table.php">Schema::create('orders', function (Blueprint $table) {
    $table->id();
    // This creates a BIGINT UNSIGNED column and a Foreign Key constraint
    $table->foreignId('user_id')
          ->constrained()
          ->onDelete('cascade'); 
    $table->decimal('total', 10, 2);
    $table->timestamps();
});</code></pre>
<p>The <code>constrained()</code> method generates the following SQL under the hood:</p>
<pre><code class="language-sql" data-filename="schema.sql">ALTER TABLE orders 
ADD CONSTRAINT orders_user_id_foreign 
FOREIGN KEY (user_id) REFERENCES users (id) 
ON DELETE CASCADE;</code></pre>

<h2>The 4 Pillars: Understanding ACID</h2>
<p>Why do we trust SQL for banking and commerce? It comes down to <strong>ACID compliance</strong>. This is a set of properties that guarantee database transactions are processed reliably.</p>

<h3>ACID in Action (Atomicity)</h3>
<p>Imagine you are transferring $100 from Account A to Account B. If the server crashes halfway through, you could lose $100. In SQL, we use **Transactions** to ensure "All or nothing":</p>
<pre><code class="language-php" data-filename="BankTransferController.php">DB::transaction(function () use ($from, $to, $amount) {
    // 1. Deduct from Account A
    DB::table('accounts')->where('id', $from)->decrement('balance', $amount);

    // 2. Add to Account B
    DB::table('accounts')->where('id', $to)->increment('balance', $amount);
    
    // If anything fails here, BOTH steps are reversed automatically.
});</code></pre>

<h2>The "Big 6" Architecture</h2>
<p>Every SQL query follows a logical execution order. Mastering these clauses is the key to understanding how your database "thinks":</p>
<ol>
    <li><strong>SELECT:</strong> The "View" — Defining which columns the user sees.</li>
    <li><strong>FROM:</strong> The "Source" — Where's the data coming from? (Includes JOINs).</li>
    <li><strong>WHERE:</strong> The "Filter" — Which individual rows meet our criteria?</li>
    <li><strong>GROUP BY:</strong> The "Organizer" — How do we bucket these rows together?</li>
    <li><strong>HAVING:</strong> The "Aggregate Filter" — Filtering the buckets (e.g., "only buckets with > 10 items").</li>
    <li><strong>ORDER BY:</strong> The "Presentation" — How should we sort the final result?</li>
</ol>

<h3>Contrast: Eloquent vs. SQL</h3>
<p>Note how neatly Eloquent maps to these Big 6 clauses:</p>
<pre><code class="language-php" data-filename="ReportService.php">return User::select('department', DB::raw('count(*) as total'))
    ->where('active', true)
    ->groupBy('department')
    ->having('total', '>', 5)
    ->orderBy('total', 'desc')
    ->get();</code></pre>
<p>The resulting SQL is predictable, but knowing it allows you to optimize it (e.g., adding an index on `active` and `department`).</p>

<h2>Final Thought</h2>
<p>SQL is a career-long skill. Frameworks come and go, but the ability to talk to data, optimize performance at the source, and ensure data integrity is what separates junior developers from senior engineers. Stop relying purely on the "magic" of your ORM — start learning the language of the engine.</p>
HTML;
    }

    private function getAdvancedSqlArticle(): string
    {
        return <<<'HTML'
<h2>Stepping Beyond SELECT *</h2>
<p>In our first guide, we explored the "Big 6" clauses and why SQL is the bedrock of reliable data. But simple filtering is just the beginning. Real-world applications require you to combine disparate data, find patterns in noise, and calculate insights on the fly. This is where <strong>intermediate SQL mastery</strong> begins.</p>

<h2>Relational Joins: The "R" in RDBMS</h2>
<p>Normalization is the practice of splitting data into multiple tables to avoid redundancy. To see the "full picture," we must join them back together.</p>

<h3>1. INNER JOIN: The Default</h3>
<p>Returns records only if there is a match in <strong>both</strong> tables. If a user has no orders, they vanish from the result.</p>
<pre><code class="language-sql" data-filename="inner_join.sql">SELECT users.name, orders.amount, orders.created_at
FROM users
INNER JOIN orders ON users.id = orders.user_id;</code></pre>

<h3>2. LEFT JOIN: Finding the "Missing" Data</h3>
<p>Returns 100% of the left table. If no match exists on the right, it returns <code>NULL</code>. This is the only way to find gaps in your data:</p>
<pre><code class="language-sql" data-filename="left_join.sql">-- Find all users who have NEVER placed an order
SELECT users.name, users.email
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE orders.id IS NULL;</code></pre>

<h3>3. SELF JOIN: Managing Hierarchies</h3>
<p>Sometimes a table needs to reference itself. Think of an <code>employees</code> table where some rows are "Managers" for other rows.</p>
<pre><code class="language-sql" data-filename="self_join.sql">SELECT 
    e.name as employee_name, 
    m.name as manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;</code></pre>

<h2>JOIN vs UNION: Horizontal vs Vertical</h2>
<p>Think of it this way:</p>
<ul>
    <li><strong>JOIN:</strong> Combines columns <strong>horizontally</strong> (User + Order).</li>
    <li><strong>UNION:</strong> Combines rows <strong>vertically</strong> (Active Users + Archived Users).</li>
</ul>
<pre><code class="language-sql" data-filename="union_example.sql">SELECT email, 'active' as status FROM active_users
UNION ALL
SELECT email, 'archived' as status FROM archived_users;</code></pre>

<h2>Grouping & Aggregates: Advanced Patterns</h2>
<p>Aggregates become powerful when you bucket data using <code>GROUP BY</code>. But there is a massive difference between <code>WHERE</code> and <code>HAVING</code>.</p>

<h3>WHERE (Row Level) vs. HAVING (Bucket Level)</h3>
<pre><code class="language-sql" data-filename="aggregates.sql">-- Show revenue per category, but ONLY for categories earning > $10k
SELECT 
    category, 
    SUM(total) as revenue
FROM orders
WHERE status = 'completed' -- Filters individual rows
GROUP BY category
HAVING revenue > 10000;    -- Filters the resulting buckets</code></pre>

<h2>Conclusion</h2>
<p>Mastering these intermediate concepts turns you from a developer who "gets data" into one who "architects insights." By pushing logic into the database via Joins and Grouping, you reduce the memory footprint of your application and ensure your code scales gracefully with your data.</p>
HTML;
    }

    private function getBeyondBig6Article(): string
    {
        return <<<'HTML'
<h2>When the Fundamentals Aren't Enough</h2>
<p>We have already mastered the "Big 6" SQL clauses and how to traverse relational joins. For most day-to-day CRUD operations, that is more than enough. But eventually, you will face a reporting requirement that feels impossible: "Give me the month-over-month growth," or "Show me the top 3 products in <em>each</em> category."</p>
<p>To solve these, we must step into the world of <strong>Advanced Analytics</strong>.</p>

<h2>Beyond Nulls: The Magic of COALESCE</h2>
<p>Reporting on data with <code>NULL</code> values often leads to broken calculations. <code>COALESCE</code> returns the first non-null value in a list.</p>
<pre><code class="language-sql" data-filename="coalesce.sql">SELECT 
    name, 
    -- If phone is null, check mobile; if both are null, show 'No Contact'
    COALESCE(phone, mobile, 'No Contact Provided') as primary_contact 
FROM users;</code></pre>

<h2>String & Date Power: REGEXP and YEAR</h2>
<p>Your database is a calculator and a string processor. Use it:</p>
<pre><code class="language-sql" data-filename="string_date.sql">-- Find specific email patterns and group by year
SELECT email, COUNT(*)
FROM users
WHERE email REGEXP '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  AND YEAR(created_at) = 2024
GROUP BY email;</code></pre>

<h2>Chained CTEs (Common Table Expressions)</h2>
<p>A CTE (using the <code>WITH</code> clause) allows you to name a temporary result set. But you can also chain them to build complex logic step-by-step:</p>
<pre><code class="language-sql" data-filename="chained_ctes.sql">WITH UserRevenue AS (
    SELECT user_id, SUM(total) as revenue
    FROM orders GROUP BY user_id
),
TopSpendors AS (
    SELECT user_id FROM UserRevenue WHERE revenue > 5000
)
SELECT users.name, users.email 
FROM users 
JOIN TopSpendors ON users.id = TopSpendors.user_id;</code></pre>

<h2>The Analytical Holy Grail: Window Functions</h2>
<p>Window functions perform calculations across rows <strong>without collapsing them</strong>. The <code>OVER()</code> clause is the key.</p>

<h3>1. Ranking: ROW_NUMBER vs. RANK</h3>
<p>How do we find the top 2 orders per customer?</p>
<pre><code class="language-sql" data-filename="ranking.sql">SELECT 
    user_id, 
    amount,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC) as order_rank
FROM orders;</code></pre>

<h3>2. Time-Travel with LEAD() and LAG()</h3>
<p>This is how you calculate month-over-month growth without self-joins:</p>
<pre><code class="language-sql" data-filename="growth.sql">SELECT 
    month, 
    revenue,
    -- Get the revenue from the PREVIOUS row
    LAG(revenue) OVER (ORDER BY month) as prev_month_revenue,
    -- Calculate difference
    revenue - LAG(revenue) OVER (ORDER BY month) as growth
FROM monthly_stats;</code></pre>

<h2>Conclusion</h2>
<p>Analytical SQL is about efficiency. Functions like <code>LAG</code>, <code>CTE</code>, and <code>COALESCE</code> allow you to build complex dashboards that load in milliseconds. Frameworks come and go, but these analytical powerhouses are universal.</p>
HTML;
    }

    private function getNPlusOneArticle(): string
    {
        return <<<'HTML'
<h2>What is the N+1 Query Problem?</h2>
<p>The N+1 query problem occurs when your application executes one query to fetch parent records and then <strong>another query for each parent</strong> to fetch its children. 100 blog posts = 101 queries. This is the "Silent Killer" of Laravel performance.</p>

<h2>Advanced Detection</h2>
<p>Detection is the first step. You should enforce strict model behavior in your <code>AppServiceProvider.php</code> to catch these early:</p>
<pre><code class="language-php" data-filename="AppServiceProvider.php">public function boot()
{
    // Throws an exception if an N+1 query is triggered in dev
    Model::preventLazyLoading(! app()->isProduction());
    
    // Prevents silent attribute discarding and accessing missing attributes
    Model::shouldBeStrict(! app()->isProduction());
}</code></pre>

<h2>The Solution: Eager Loading</h2>
<p>The <code>with()</code> method is your primary weapon. But you can take it much further than simple relationships.</p>

<h3>1. Nested Eager Loading (3 Levels Deep)</h3>
<p>You can load deeply nested relationships in a single go, reducing hundreds of queries to just 4:</p>
<pre><code class="language-php" data-filename="nested_loading.php">$posts = Post::with('author.profile.city.country')->get();</code></pre>

<h3>2. Memory-Optimized Loading</h3>
<p>Fetching entire rows is wasteful. Use the colon syntax to restrict columns. <strong>Warning:</strong> You MUST include the ID/Foreign Key!</p>
<pre><code class="language-php" data-filename="select_loading.php">$posts = Post::with('author:id,name,avatar')->get();</code></pre>

<h3>3. Constrained Eager Loading</h3>
<p>Only load specific related records that meet a criteria:</p>
<pre><code class="language-php" data-filename="constrained_loading.php">$users = User::with(['orders' => function ($query) {
    $query->where('total', '>', 500)->latest();
}])->get();</code></pre>

<h3>4. withExists() and withCount()</h3>
<p>Commonly, you don't need the actual related models, just a boolean or a count. These run as efficient subqueries in SQL:</p>
<pre><code class="language-php" data-filename="aggregates_loading.php">$posts = Post::query()
    ->withCount('comments')
    ->withExists('featuredImage')
    ->withMax('comments', 'created_at')
    ->get();

// Access via: $post->comments_count, $post->featured_image_exists, etc.</code></pre>

<h2>Conclusion</h2>
<p>Eager Loading is about efficiency. By mastering <code>with()</code>, <code>withCount()</code>, and <code>shouldBeStrict()</code>, you ensure your Laravel applications stay lightning-fast as they scale from 100 to 1,000,000 users.</p>
HTML;
    }

    private function getOptimizationArticle(): string
    {
        return <<<'HTML'
<h2>Why Optimization Matters</h2>
<p>Optimizing SQL is about understanding the mechanical sympathy of the database engine. As your data grows, "deceptively simple" queries become major bottlenecks.</p>

<h2>The Power of Composite Indexes</h2>
<p>A composite index covers multiple columns. <strong>The Rule of the Leftmost Prefix:</strong> An index on <code>(A, B)</code> optimizes queries on <code>A</code> or <code>(A and B)</code>, but NOT on <code>B</code> alone.</p>
<pre><code class="language-php" data-filename="composite_index.php">Schema::table('orders', function (Blueprint $table) {
    // Optimizes: WHERE user_id = ? AND status = ?
    // Also optimizes: WHERE user_id = ?
    // DOES NOT Optimize: WHERE status = ?
    $table->index(['user_id', 'status']);
});</code></pre>

<h2>Covering Indexes: Zero-Touch Tables</h2>
<p>A covering index contains <em>all</em> data requested in the <code>SELECT</code>. The database reads everything from the index in memory and never touches the disk.</p>
<pre><code class="language-sql" data-filename="covering_index.sql">-- Index: (email, name)
-- Query:
SELECT email, name FROM users WHERE email = 'test@example.com';
-- This is lightning fast because the results are already IN the index tree.</code></pre>

<h2>Effective Auditing: EXPLAIN ANALYZE</h2>
<p>Never guess; always measure. Use <code>EXPLAIN ANALYZE</code> to see what the database is actually doing:</p>
<pre><code class="language-sql" data-filename="explain_analyze.sql">EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE created_at > '2024-01-01' 
ORDER BY total DESC;

/* 
Output might show:
- Filter: (orders.created_at > '2024-01-01') (cost=150.00 rows=500)
- Table scan on orders (cost=2000.00 rows=100000) <- Red flag!
*/</code></pre>

<h2>Fulltext for Speed</h2>
<p>Using <code>LIKE '%keyword%'</code> is extremely slow. For text search, use fulltext indexes:</p>
<pre><code class="language-php" data-filename="fulltext_index.php">Schema::table('posts', function (Blueprint $table) {
    $table->fulltext(['title', 'body']);
});

// In Query:
Post::whereFulltext(['title', 'body'], 'laravel performance')->get();</code></pre>

<h2>Conclusion</h2>
<p>Database optimization is a continuous process. By architecting your database with B-Trees, selectivity, and composite indexing in mind, you ensure that your Laravel application remains lightning-fast regardless of volume.</p>
HTML;
    }
}
