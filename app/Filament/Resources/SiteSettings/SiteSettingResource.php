<?php

namespace App\Filament\Resources\SiteSettings;

use App\Filament\Resources\SiteSettings\Pages\ManageSiteSettings;
use App\Models\SiteSetting;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-adjustments-horizontal';

    protected static string|\UnitEnum|null $navigationGroup = 'Portfolio';

    protected static ?string $navigationLabel = 'Site settings';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('cv_path')->label('CV PDF path')->helperText('For example: Resume.pdf or storage/cv/current.pdf. Missing files hide the download link.')->maxLength(255),
            TextInput::make('availability')->required()->maxLength(255),
            TextInput::make('email')->email()->required(),
            TextInput::make('github_url')->url()->maxLength(255),
            TextInput::make('linkedin_url')->url()->maxLength(255),
            TextInput::make('site_url')->url()->required()->maxLength(255),
            TextInput::make('location')->maxLength(255),
            TextInput::make('timezone')->maxLength(255),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('email')->label('Contact email'),
            TextColumn::make('availability')->wrap(),
        ])->recordActions([EditAction::make()])->toolbarActions([]);
    }

    public static function getEloquentQuery(): Builder
    {
        SiteSetting::current();

        return parent::getEloquentQuery()->whereKey(1);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function canDeleteAny(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return ['index' => ManageSiteSettings::route('/')];
    }
}
