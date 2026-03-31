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
                'featured_image' => null,
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
}
