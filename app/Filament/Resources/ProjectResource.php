<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Actions;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-code-bracket-square';

    protected static string|\UnitEnum|null $navigationGroup = 'Portfolio';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Project Details')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        Textarea::make('description')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                        Select::make('category')
                            ->options([
                                'React' => 'React',
                                'Vue' => 'Vue',
                                'AI' => 'AI',
                                'Laravel' => 'Laravel',
                                'WordPress' => 'WordPress',
                                'Other' => 'Other',
                            ])
                            ->required()
                            ->default('React'),
                        TagsInput::make('technologies')
                            ->placeholder('Add a technology...')
                            ->separator(','),
                    ])->columns(2),

                Section::make('Links')
                    ->schema([
                        TextInput::make('link')
                            ->label('Live Demo URL')
                            ->url()
                            ->maxLength(255),
                        TextInput::make('github')
                            ->label('GitHub URL')
                            ->url()
                            ->maxLength(255),
                    ])->columns(2),

                Section::make('Media & Settings')
                    ->schema([
                        FileUpload::make('image')
                            ->image()
                            ->directory('img/projects')
                            ->columnSpanFull(),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_featured')
                            ->label('Featured on Homepage')
                            ->default(false),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->circular(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'React' => 'info',
                        'Vue' => 'success',
                        'AI' => 'warning',
                        'Laravel' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'React' => 'React',
                        'Vue' => 'Vue',
                        'AI' => 'AI',
                        'Laravel' => 'Laravel',
                        'WordPress' => 'WordPress',
                        'Other' => 'Other',
                    ]),
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured'),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->reorderable('sort_order');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
