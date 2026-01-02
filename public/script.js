async function fetchNetwork() {
    const phone = document.getElementById('phone').value;
    const btnText = document.getElementById('btnText');
    const result = document.getElementById('result');
    const error = document.getElementById('error');

    if (!phone) return;
    
    btnText.innerText = "Checking...";
    result.classList.add('hidden');
    error.classList.add('hidden');

    try {
        const res = await fetch(`/api/check-network?phone=${phone}`, {
            headers: { 'x-requested-with': 'XMLHttpRequest' }
        });
        const data = await res.json();

        if (data.Items && data.Items.length > 0) {
            const provider = data.Items[0];
            document.getElementById('name').innerText = provider.Name;
            document.getElementById('type').innerText = provider.PaymentTypes[0];
            document.getElementById('logo').src = provider.LogoUrl;
            result.classList.remove('hidden');
        } else {
            error.innerText = "Invalid Number or Provider not found";
            error.classList.remove('hidden');
        }
    } catch (e) {
        error.innerText = "Server Error. Try again.";
        error.classList.remove('hidden');
    } finally {
        btnText.innerText = "Check Provider";
    }
}