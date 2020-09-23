$RootCAParams = @{
	DnsName = "LocalHost DEV Root Cert";
	KeyLength = 2048;
	KeyAlgorithm = 'RSA';
	HashAlgorithm = 'SHA256';
	KeyExportPolicy = 'Exportable';
	NotAfter = (Get-Date).AddYears(10);
	CertStoreLocation = 'Cert:\LocalMachine\My';
	KeyUsage = 'CertSign', 'CRLSign', 'DigitalSignature';
	KeyUsageProperty = 'All'
}

$RootCA = New-SelfSignedCertificate @RootCAParams

$CertParams = @{
	DnsName = "localhost";
	Signer = $RootCA;
	KeyLength = 2048;
	KeyAlgorithm = 'RSA';
	HashAlgorithm = 'SHA256';
	KeyExportPolicy = 'Exportable';
	NotAfter = (Get-Date).AddYears(10);
	CertStoreLocation = 'Cert:\LocalMachine\My';
}

$Cert = New-SelfSignedCertificate @CertParams

Export-Certificate -Cert $RootCA -FilePath "$Env:TEMP\RootCA.crt"
Import-Certificate -CertStoreLocation 'Cert:\LocalMachine\Root' -FilePath "$Env:TEMP\RootCA.crt"
Remove-Item "$Env:TEMP\RootCA.crt" -Force

$CertPassword = ConvertTo-SecureString -AsPlainText $password -Force
Export-PfxCertificate -Cert $Cert -FilePath "$Env:TEMP\server.pfx" -Password $CertPassword

# Export server private key to pem format
openssl 'pkcs12' -in "$Env:TEMP\server.pfx" -nocerts -nodes -out '.\server-key.pem' -passin "pass:$password"
Remove-Item "$Env:TEMP\server.pfx" -Force

# Convert server certificate to pem format
Export-Certificate -Cert $Cert -FilePath "$Env:TEMP\server.crt"
openssl 'x509' -inform 'DER' -in "$Env:TEMP\server.crt" -out '.\server-cert.pem'
Remove-Item "$Env:TEMP\server.crt" -Force
