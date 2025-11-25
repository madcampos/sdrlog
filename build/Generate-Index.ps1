$Items = Get-ChildItem '../public/data/*/index.json' |
ForEach-Object {
	$Data = Get-Content $_ | ConvertFrom-Json

	[PSCustomObject]@{
		sku = $Data.sku[0]
		name = $Data.name
		link = "./$($Data.sku[0])/index.json"
		cover = "./$($Data.sku[0])/$(Split-Path $Data.cover -Leaf)"
		category = $Data.category
		type = $Data.type
		edition = $Data.edition
		status = $Data.status
	}
} |
Sort-Object -Stable -Property 'sku'

[PSCustomObject]@{
	'$schema' = './$schemas/data-list.schema.json'
	lastUpdated = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
	items = $Items
} |
ConvertTo-Json |
Out-File '../public/data/index.json' -Encoding 'utf8' -Force

Push-Location '../public/data/'
dprint fmt 'index.json' | Out-Null

Pop-Location
