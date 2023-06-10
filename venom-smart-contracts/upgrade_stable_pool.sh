export DEFAULT_PARAMS="--config locklift.config.js --disable-build --enable-tracing --external-build node_modules/tip3/build --network local"
export NO_TRACE="--config locklift.config.js --disable-build --network local"

#prepare pool
npx locklift run $NO_TRACE --script scripts/0-reset-migration.js
npx locklift run $NO_TRACE --script scripts/0-deploy-account.js --key_number='0' --balance='500'
npx locklift run $NO_TRACE --script scripts/0-deploy-account.js --key_number='1' --balance='50'
npx locklift run $NO_TRACE --script scripts/0-deploy-account.js --key_number='2' --balance='200'
npx locklift run $NO_TRACE --script scripts/0-deploy-TokenFactory.js
npx locklift run $NO_TRACE --script scripts/1-deploy-vault-and-root.js --pair_contract_name='DexPairPrev' --root_contract_name='DexRootPrev' --vault_contract_name='DexVault' --account_contract_name='DexAccount'
npx locklift run $NO_TRACE --script scripts/2-deploy-test-tokens.js --tokens='["foo","bar","qwe","tst","coin"]'
npx locklift run $NO_TRACE --script scripts/3-mint-test-tokens.js --mints='[{"account":2,"amount":2000000,"token":"foo"},{"account":2,"amount":2000000,"token":"bar"},{"account":2,"amount":4000000,"token":"qwe"},{"account":2,"amount":1000000,"token":"tst"},{"account":2,"amount":1000000,"token":"coin"},{"account":3,"amount":2000000,"token":"foo"},{"account":3,"amount":2000000,"token":"bar"},{"account":3,"amount":1000000,"token":"qwe"},{"account":3,"amount":1000000,"token":"tst"},{"account":3,"amount":1000000,"token":"coin"}]'
npx locklift run $NO_TRACE --script scripts/4-deploy-test-dex-account.js --owner_n=2 --contract_name='DexAccount'
npx locklift run $NO_TRACE --script scripts/4-deploy-test-dex-account.js --owner_n=3 --contract_name='DexAccount'

npx locklift run $NO_TRACE --script scripts/5-deploy-test-pair.js --pairs='[["tst","foo"],["coin","foo"],["foo", "bar"]]' --contract_name='DexPairPrev'
npx locklift test $NO_TRACE --tests test/09-add-pair-test.js --left='tst' --right='foo' --account=2 --contract_name='DexPairPrev' --account_contract_name='DexAccount' --ignore_already_added='true'
npx locklift test $NO_TRACE --tests test/09-add-pair-test.js --left='coin' --right='foo' --account=2 --contract_name='DexPairPrev' --account_contract_name='DexAccount' --ignore_already_added='true'
npx locklift test $NO_TRACE --tests test/09-add-pair-test.js --left='foo' --right='bar' --account=2 --contract_name='DexPairPrev' --account_contract_name='DexAccount' --ignore_already_added='true'

npx locklift test $NO_TRACE --tests test/10-deposit-to-dex-account.js --deposits='[{ "tokenId": "foo", "amount": 1000000 }, { "tokenId": "bar", "amount": 1000000 }, { "tokenId": "tst", "amount": 1000000 }, { "tokenId": "coin", "amount": 1000000 }]'

npx locklift test $NO_TRACE --tests test/12-pair-deposit-liquidity.js --left_token_id 'tst' --right_token_id 'foo' --left_amount '10000' --right_amount '10000' --auto_change 'false' --contract_name='DexPairPrev' --account_contract_name='DexAccountPrev'
npx locklift test $NO_TRACE --tests test/12-pair-deposit-liquidity.js --left_token_id 'coin' --right_token_id 'foo' --left_amount '10000' --right_amount '10000' --auto_change 'false' --contract_name='DexPairPrev' --account_contract_name='DexAccountPrev'
npx locklift test $NO_TRACE --tests test/12-pair-deposit-liquidity.js --left_token_id 'foo' --right_token_id 'bar' --left_amount '10000' --right_amount '10000' --contract_name='DexPairPrev' --account_contract_name='DexAccountPrev'

npx locklift test $NO_TRACE --tests test/30-install-pair-code-v2.js --contract_name='DexStablePairPrev' --pool_type=2
npx locklift test $NO_TRACE --tests test/35-upgrade-pair.js --left='foo' --right='bar' --old_contract_name='DexPairPrev' --new_contract_name='DexStablePairPrev' --pool_type=2

npx locklift run $NO_TRACE --script scripts/update-dexRoot.js --old_contract='DexRootPrev' --new_contract='DexRoot'
#npx locklift run $NO_TRACE --script scripts/update-dexVault.js --old_contract='DexVaultPrev' --new_contract='DexVault'

npx locklift test $NO_TRACE --tests test/30-install-pair-code-v2.js --contract_name='DexPair' --pool_type=1
npx locklift test $NO_TRACE --tests test/35-upgrade-pair.js --left='tst' --right='foo' --old_contract_name='DexPairPrev' --new_contract_name='DexPair' --pool_type=1
npx locklift test $NO_TRACE --tests test/35-upgrade-pair.js --left='coin' --right='foo' --old_contract_name='DexPairPrev' --new_contract_name='DexPair' --pool_type=1

npx locklift test $NO_TRACE --tests test/30-install-pair-code-v2.js --contract_name='DexStablePair' --pool_type=2
npx locklift test $NO_TRACE --tests test/35-upgrade-pair.js --left='foo' --right='bar' --old_contract_name='DexStablePairPrev' --new_contract_name='DexStablePair' --pool_type=2

#npx locklift run $NO_TRACE --script scripts/update-dexAccounts.js

npx locklift run $NO_TRACE --script scripts/5-deploy-test-pair.js --pairs='[["tst","coin"]]' --contract_name='DexPair'
npx locklift test $NO_TRACE --tests test/09-add-pair-test.js --left='tst' --right='coin' --account=2 --contract_name='DexPair' --account_contract_name='DexAccount' --ignore_already_added='true'
npx locklift test $NO_TRACE --tests test/12-pair-deposit-liquidity.js --left_token_id 'tst' --right_token_id 'coin' --left_amount '10000' --right_amount '10000' --auto_change 'false' --contract_name='DexPair' --account_contract_name='DexAccount'

npx locklift test $DEFAULT_PARAMS --tests test/30-install-pool-code.js --contract_name='DexStablePool' --pool_type=3

# test stable pool
npx locklift run $NO_TRACE --script scripts/5-deploy-test-pool.js --pools='[["foo", "bar", "qwe"],["qwe","tst","coin"]]' --contract_name='DexStablePool'

npx locklift test $NO_TRACE --tests test/35-upgrade-pool.js --roots='["foo", "bar", "qwe"]' --old_contract_name='DexStablePool' --new_contract_name='DexStablePool' --pool_type=2

npx locklift test $NO_TRACE --tests test/09-add-pool-test.js --roots='["foo", "bar", "qwe"]' --account=2 --contract_name='DexStablePool' --ignore_already_added='true'
npx locklift test $NO_TRACE --tests test/09-add-pool-test.js --roots='["qwe", "tst", "coin"]' --account=2 --contract_name='DexStablePool' --ignore_already_added='true'

npx locklift test $NO_TRACE --tests test/10-deposit-to-dex-account.js --deposits='[{ "tokenId": "qwe", "amount": 2000000 }]'

npx locklift test $NO_TRACE --tests test/12-pool-deposit-liquidity.js --roots='["foo", "bar", "qwe"]' --amounts='[100000, 100000, 100000]' --contract_name='DexStablePool'
npx locklift test $NO_TRACE --tests test/12-pool-deposit-liquidity.js --roots='["qwe", "tst", "coin"]' --amounts='[100000, 100000, 100000]' --contract_name='DexStablePool'

npx locklift test $NO_TRACE --tests test/15-dex-account-pool-operations.js --roots='["foo", "bar", "qwe"]' --pool_contract_name='DexStablePool' --account_contract_name='DexAccount'

npx locklift test $NO_TRACE --tests test/20-pool-direct-operations.js --roots='["foo", "bar", "qwe"]' --contract_name='DexStablePool'

# cross-pool-exchange test (prepare)
npx locklift run $NO_TRACE --script scripts/5-deploy-test-pair.js --pairs='[["tst", "FooBarQweLp"]]' --contract_name='DexPair'
npx locklift test $NO_TRACE --tests test/09-add-pair-test.js --left='tst' --right='FooBarQweLp' --account=2 --contract_name='DexPair' --ignore_already_added='true'
npx locklift test $NO_TRACE --tests test/12-pool-deposit-liquidity.js --roots='["foo", "bar", "qwe"]' --amounts='[100000, 100000, 100000]' --contract_name='DexStablePool'
npx locklift test $NO_TRACE --tests test/10-deposit-to-dex-account.js --deposits='[{ "tokenId": "FooBarQweLp", "amount": 30000 }]'
npx locklift test $NO_TRACE --tests test/12-pair-deposit-liquidity.js --left_token_id 'tst' --right_token_id 'FooBarQweLp' --left_amount '10000' --right_amount '10000' --auto_change 'false' --contract_name='DexPair'

# cross-pool-exchange test (dex-pair)
# --pool_route='[["foo","bar","qwe"],["tst","FooBarQweLp"],["tst","coin"]]' --token_route='["bar","FooBarQweLp","tst","coin"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='bar' --route='[{"outcoming": "FooBarQweLp", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "tst", "roots": ["tst","FooBarQweLp"], "numerator": 1, "nextSteps": [{"outcoming": "coin", "roots": ["tst","coin"], "numerator": 1, "nextSteps": []}]}]}]'
# --pool_route='[["tst","coin"],["tst","FooBarQweLp"],["foo","bar","qwe"]]' --token_route='["coin","tst","FooBarQweLp","qwe"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='coin' --route='[{"outcoming": "tst", "roots": ["tst","coin"], "numerator": 1, "nextSteps": [{"outcoming": "FooBarQweLp", "roots": ["tst","FooBarQweLp"], "numerator": 1, "nextSteps": [{"outcoming": "qwe", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": []}]}]}]'
# --pool_route='[["tst","foo"],["foo","bar","qwe"]]' --token_route='["tst","foo","FooBarQweLp"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='tst' --route='[{"outcoming": "foo", "roots": ["tst","foo"], "numerator": 1, "nextSteps": [{"outcoming": "FooBarQweLp", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": []}]}]'
# --pool_route='[["foo","bar","qwe"],["tst","foo"]]' --token_route='["FooBarQweLp","foo","tst"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=50 --start_token='FooBarQweLp' --route='[{"outcoming": "foo", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "tst", "roots": ["tst","foo"], "numerator": 1, "nextSteps": []}]}]'
# --pool_route='[["foo","bar","qwe"],["tst","foo"],["qwe", "tst", "coin"]]' --token_route='["bar","foo","tst","qwe"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='bar' --route='[{"outcoming": "foo", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "tst", "roots": ["tst","foo"], "numerator": 1, "nextSteps": [{"outcoming": "qwe", "roots": ["qwe", "tst", "coin"], "numerator": 1, "nextSteps": []}]}]}]'
# --pool_route='[["foo","bar","qwe"],["qwe", "tst", "coin"]]' --token_route='["bar","qwe","tst"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='bar' --route='[{"outcoming": "qwe", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "tst", "roots": ["qwe", "tst", "coin"], "numerator": 1, "nextSteps": []}]}]'
# --pool_route='[["coin","foo"],["foo","bar","qwe"],["tst","FooBarQweLp"]]' --token_route='["coin","foo","FooBarQweLp","tst"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='coin' --route='[{"outcoming": "foo", "roots": ["coin","foo"], "numerator": 1, "nextSteps": [{"outcoming": "FooBarQweLp", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "tst", "roots": ["tst","FooBarQweLp"], "numerator": 1, "nextSteps": []}]}]}]'
# --pool_route='[["tst","FooBarQweLp"],["foo","bar","qwe"],["foo","coin"]]' --token_route='["tst","FooBarQweLp","foo","coin"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='tst' --route='[{"outcoming": "FooBarQweLp", "roots": ["tst","FooBarQweLp"], "numerator": 1, "nextSteps": [{"outcoming": "foo", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "coin", "roots": ["foo","coin"], "numerator": 1, "nextSteps": []}]}]}]'
# --pool_route='[["tst","foo"],["foo","bar","qwe"],["qwe", "tst", "coin"]]' --token_route='["tst","foo","qwe","coin"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='tst' --route='[{"outcoming": "foo", "roots": ["tst","foo"], "numerator": 1, "nextSteps": [{"outcoming": "qwe", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "coin", "roots": ["qwe", "tst", "coin"], "numerator": 1, "nextSteps": []}]}]}]'

# cross-pool-exchange test (dex-stable-pair)
# --pool_route='[["foo","bar"],["foo","bar","qwe"]]' --token_route='["foo","bar","qwe"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='foo' --route='[{"outcoming": "bar", "roots": ["foo","bar"], "numerator": 1, "nextSteps": [{"outcoming": "qwe", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": []}]}]'
# --pool_route='[["foo","bar","qwe"],["foo","bar"]]' --token_route='["qwe","bar","foo"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='qwe' --route='[{"outcoming": "bar", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "foo", "roots": ["foo","bar"], "numerator": 1, "nextSteps": []}]}]'
# --pool_route='[["foo","bar","qwe"],["foo","bar"],["tst","foo"]]' --token_route='["qwe","bar","foo","tst"]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='qwe' --route='[{"outcoming": "bar", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "foo", "roots": ["foo","bar"], "numerator": 1, "nextSteps": [{"outcoming": "tst", "roots": ["tst","foo"], "numerator": 1, "nextSteps": []}]}]}]'

# split-cross-pool-exchange test
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='qwe' --route='[{"outcoming": "bar", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": [{"outcoming": "foo", "roots": ["foo","bar"], "numerator": 1, "nextSteps": [{"outcoming": "tst", "roots": ["tst","foo"], "numerator": 2, "nextSteps": []},{"outcoming": "coin", "roots": ["foo","coin"], "numerator": 3, "nextSteps": [{"outcoming": "tst", "roots": ["qwe", "tst", "coin"], "numerator": 1, "nextSteps": []}]}]}]}]'
npx locklift test $NO_TRACE --tests test/40-split-cross-pool-exchange.js --amount=1000 --start_token='qwe' --route='[{"outcoming": "tst", "roots": ["qwe", "tst", "coin"], "numerator": 1, "nextSteps": [{"outcoming": "FooBarQweLp", "roots": ["tst","FooBarQweLp"], "numerator": 1, "nextSteps": []},{"outcoming": "coin", "roots": ["tst","coin"], "numerator": 1, "nextSteps": [{"outcoming": "foo", "roots": ["coin","foo"], "numerator": 1, "nextSteps": [{"outcoming": "FooBarQweLp", "roots": ["foo","bar","qwe"], "numerator": 1, "nextSteps": []}]}]}]}]'

